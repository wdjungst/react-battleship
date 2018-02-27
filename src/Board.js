import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import Sector from './Sector';
import water from './images/water.jpg';

const Bg = styled.div`
  background: url(${water});
  margin: 0 100px;
  max-height: fit-content;
`

class Board extends React.Component {
  xGrid = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  state = {
    gameboard: [
      [...this.xGrid],
      [1,0,0,0,0,0,0,0,0,0,0],
      [2,0,0,0,0,0,0,0,0,0,0],
      [3,0,0,0,0,0,0,0,0,0,0],
      [4,0,0,0,0,0,0,0,0,0,0],
      [5,0,0,0,0,0,0,0,0,0,0],
      [6,0,0,0,0,0,0,0,0,0,0],
      [7,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0],
      [9,0,0,0,0,0,0,0,0,0,0],
      [10,0,0,0,0,0,0,0,0,0,0]
    ],
    set: 0,
  }

  toggleSet = () => {
    this.setState( state => {
      const set = state.set === 0 ? 1 : 0
      return { set }
    });
  }

  grid = () => {
    const gb = this.state.gameboard.map( (row, rowI) => {
      return row.map( (cell, i) => {
        return (
          <Grid.Column key={`${rowI}:${i}`}>
            <Sector 
              value={cell} 
              locationY={rowI} 
              locationX={i} 
              selectable={this.props.playable} 
              startSelect={this.startSelect} 
              endSelect={this.endSelect} 
              set={this.state.set}
              toggleSet={this.toggleSet}
            />
          </Grid.Column>
        )
      });
    });

    return gb;
  }

  startSelect = (x,y) => {
    const { selected } = this.props;
    const gb = this.state.gameboard.map( (row, rowi) => {
      return row.map( (c, i) => { 
        if (c !== 0)
          return c
        else if (i === 0)
          return c
        else if ( y === rowi && i === x + (selected.size - 1) || y === rowi && i === x - (selected.size - 1))
          return 'p'
        else if (y === rowi && x === i)
          return 's'
        return c
      });
    });

    this.setState({ gameboard: gb })
  }

  endSelect = (x,y) => {
    const { selected, selectedShips } = this.props;
    let indexes = [];
    let shipRow;
    const gb = this.state.gameboard.map( (row, rowi) => {
      if (row.includes('s')) {
        shipRow = rowi;
        let s = row.findIndex( c => c == 's')
        let start = x < s ? x : s
        let end = start === x ? s : x
        const header = new RegExp(/^([A-J]|[1-9]|10)$/)

        for (let i = start; i <= end; i++) {
          indexes.push(i);
        }

        return row.map( (c, i) => {

          if (c === 'ship')
            return c;
          else if (header.test(c))
            return c;
          else if (indexes.includes(i))
            return 'ship'
          return 0
        })
      } else {
        return row
      }
    });

    this.setState({ gameboard: gb }, () => this.props.updateSelected(selected, indexes, shipRow) );
  }

  render() {
    return (
      <Bg>
        <Grid columns={11}>
          <Grid.Row>
            { this.grid() }
          </Grid.Row>
        </Grid>
      </Bg>
    )
  }
}


export default Board;
