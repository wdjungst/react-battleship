import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled(Segment)`
  margin: 5px !important;
  background-color: rgba(0, 0, 0, 0.7) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${ props => props.selectable ? 'pointer' : 'cancel' };
`

const Bubble = styled(Icon)`
  color: ${ props => props.selectable ? 'white' : 'grey' };
  backgroundColor: ${ props => props.used ? 'green' : 'none' };
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`

const Letter = styled.span`
  color: white;
  font-size: 2em;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`

class Sector extends React.Component {
  state = { selectable: null, used: false, set: 0 }

  componentWillReceiveProps(nextProps) {
    let p = this.props;
    if (this.props !== nextProps) {
      if (!this.state.used && nextProps.selectable)
        this.setState({ selectable: true });
    }
  }

  getChar = () => {
    const { value, locationX, locationY } = this.props;
    const { selectable, used } = this.state;
    const props = { selectable, used }
    const header = new RegExp(/^([A-J]|[1-9]|10)$/)
    if (locationX === 0 && locationY === 0)
      return <Bubble name='flag' />
    else if (value === 'ship')
      return <Bubble name='flag' />
    else if (header.test(value))
      return <Letter>{value}</Letter>
    else
      return <Bubble {...props} name={ (value === 's' || value === 'p') ? 'hand pointer': 'circle'} />
  }

  select = () => {
    const { locationX: x, locationY: y, set, toggleSet, startSelect, endSelect, value } = this.props;
    switch (set) {
      case 0:
        startSelect(x,y);
        break;
      case 1:
        if (value === 'p') 
          endSelect(x,y);
        else
          return
    }

    toggleSet();
  }

  render() {
    const { selectable, used } = this.state;
    return (
      <Container raised selectable={selectable == true && selectable} used={used}  onClick={ selectable ? this.select : f => f }>
        { this.getChar() }
      </Container>
    )
  }
}

export default Sector
