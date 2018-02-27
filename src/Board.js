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
        if ( y === rowi && i === x + (selected.size - 1) || y === rowi && i === x - (selected.size - 1))
          return 'p'
        if (y === rowi && x === i)
          return 's'
        return c
      });
    });

    this.setState({ gameboard: gb })
  }

  endSelect = (x,y) => {
    const { selected } = this.props;
    const gb = this.state.gameboard.map( (row, rowi) => {
      if (row.includes('s')) {
        return row.map( (c, i) => {
          if (i === x || c === 's') 
            return selected.name.split("")[0]
          return 0
        })
      } else {
        return row
      }
    });
    
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
