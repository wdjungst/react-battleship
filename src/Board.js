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
  yGrid = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  grid = () => {
    let gameBoard = this.xGrid.map( (x,xInt) => {
      return this.yGrid.map( (y,yInt) => 
        <Grid.Column key={`${x}:${y}`}>
          <Sector selectable={this.props.playable} x={this.xGrid[yInt]} y={this.yGrid[xInt]} yInt={yInt} xInt={xInt} letter={this.xGrid[yInt]} number={this.yGrid[xInt]} />
        </Grid.Column>
    )
    })

    return gameBoard;
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
