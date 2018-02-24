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
  state = { selectable: false, used: false }

  componentWillReceiveProps(nextProps) {
    let p = this.props;
    if (this.props !== nextProps) {
      if (!this.state.used && nextProps.selectable)
        this.setState({ selectable: true });
    }
  }

  getChar = () => {
    const { xInt, yInt, letter, number } = this.props;
    const { selectable, used } = this.state;
    let props = { selectable, used }
    if (xInt === 0 && yInt === 0)
      return <Bubble name='flag' />
    else if (xInt === 0) 
      return <Letter>{letter}</Letter>
    else if (yInt === 0)
      return <Letter>{number}</Letter>
    else
      return <Bubble {...props} name='circle' />
  }

  select = () => {
    console.log(`x: ${this.props.x} y: ${this.props.y}`)
  }

  render() {
    const { selectable, used } = this.state;
    return (
      <Container raised selectable={selectable} used={used}  onClick={ selectable ? this.select : f => f }>
        { this.getChar() }
      </Container>
    )
  }
}

export default Sector
