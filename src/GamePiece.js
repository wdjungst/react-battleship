import React from 'react';
import styled from 'styled-components'

const ShipContainer = styled.div`
  cursor: pointer;
`

const Ship = styled.div`
  border-radius: 25px;
  border: ${ props => props.selected ? 'solid 4px green' : 'none' };
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
  state = { orientation: 'row', selected: false, used: false, pins: [] }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (!nextProps.hold) 
        this.setState({ orientation: 'row' })
      if (nextProps.keepSelected !== this.props.selected) {
        this.setState({ selected: nextProps.keepSelected })
      }
    }
  }

  select = () => {
    this.setState( state => {
      if (state.selected) {
        return { selected: false }
      } else {
        return { selected: true }
      }
    })

    this.props.unSelect(this.props.name)
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
    const { orientation, selected } = this.state;
    const { size, name } = this.props;
    const Component = orientation === 'row' ? Ship : VShip;
    return (
      <ShipContainer onDoubleClick={this.flip} onClick={this.select}>
        <Component size={size} orientation={orientation} selected={selected}>
          <span>
            { name }
          </span>
        </Component>
      </ShipContainer>
    )
  }
}

export default GamePiece;
