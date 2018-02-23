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
    flipped: null
  }

  flipAll = (name) => {
    this.setState({ flipped: name });
  }

  gamePieces = () => {
    return this.state.pieces.map( ship => { 
        let { flipped } = this.state;
        let hold = flipped === ship.name
        return (
          <GamePiece 
            key={ship.name} 
            {...ship} 
            hold={hold} 
            flipAll={this.flipAll}
          />
        )
      }
    )
  }

  render() {
    return (
      <Wrapper>
        <Pieces>
          { this.gamePieces() }
        </Pieces>
        <Board />
      </Wrapper>
    )
  }
}

export default App;
