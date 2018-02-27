import React from 'react'
import Board from './Board';
import styled from 'styled-components';
import GamePiece from './GamePiece';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Pieces = styled.div`
  align-self: center;
  height: 500px;
`

class App extends React.Component {
  state = {
    pieces: [
      { name: 'Carrier', size: 5 },
      { name: 'Battleship', size: 4 },
      { name: 'Cruiser', size: 3 },
      { name: 'Submarine', size: 3 },
      { name: 'Destroyer', size: 2 },
    ],
    flipped: null,
    selected: null,
  }

  flipAll = (name) => {
    this.setState({ flipped: name });
  }

  updateSelected = (ship, distances, axis) => {
    const { pieces } = this.state;
    //TODO make this work for both axis
    const loc = distances.map( x => {
      return { x, y: axis }
    });

    const usedShip = {...ship, loc};
    this.setState({ 
      pieces: pieces.map( p => {
        if (p.name === ship.name)
          return usedShip
        return p
      })
    })

    this.unSelect()
  }

  unSelect = (name = null) => {
    if (name === this.state.selected)
      this.setState({ selcted: null })
    else
      this.setState({ selected: name });
  }

  gamePieces = () => {
    return this.state.pieces.filter( obj => {
      return !obj.hasOwnProperty('loc')
    }).map( ship => { 
        let { flipped, selected } = this.state;
        let hold = flipped === ship.name
        let keepSelected = selected === ship.name;
        return (
          <GamePiece 
            key={ship.name} 
            {...ship} 
            hold={hold} 
            keepSelected={keepSelected}
            flipAll={this.flipAll}
            unSelect={this.unSelect}
          />
        )
      }
    )
  }

  findShip = () => {
    return this.state.pieces.find( p => p.name === this.state.selected );
  }

  render() {
    const playable = this.state.selected ? true : false
    return (
      <Wrapper>
        <Pieces>
          { this.gamePieces() }
        </Pieces>
        <Board playable={playable} selected={this.findShip()} updateSelected={this.updateSelected} />
      </Wrapper>
    )
  }
}

export default App;
