import React from 'react';
import styled from 'styled-components'

const ShipContainer = styled.div`
  cursor: pointer;
`

const Ship = styled.div`
  border-radius: 25px;
  background-color: darkgrey;
  width: ${ props => `${props.size * 50}px` };
  height: 50px;
  margin: ${ props => props.orientation === 'row' ? '10px' : `${props.size * 25}px` } 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`

const VShip = Ship.extend`
  transform: rotate(90deg);
`

class GamePiece extends React.Component {
  state = { orientation: 'row' }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hold !== this.props.hold) {
      if (!nextProps.hold)
        this.setState({ orientation: 'row' })
    }
  }

  flip = () => {
    this.setState( state => {
      let orientation;
      if (state.orientation === 'row') {
        this.props.flipAll(this.props.name)
         orientation = 'column' 
      } else {
        orientation = 'row'
      }

      return { orientation }
    });
  }

  render() {
    const { orientation } = this.state;
    const { size, name } = this.props;
    const Component = orientation === 'row' ? Ship : VShip;
    return (
      <ShipContainer onDoubleClick={this.flip}>
        <Component size={size} orientation={orientation}>
          <span>
            { name }
          </span>
        </Component>
      </ShipContainer>
    )
  }
}

export default GamePiece;
