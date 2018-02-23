import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled(Segment)`
  margin: 5px !important;
  background-color: rgba(0, 0, 0, 0.7) !important;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Bubble = styled(Icon)`
  color: grey;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`

const Letter = styled.span`
  color: white;
  font-size: 2em;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`

class Sector extends React.Component {

  getChar = () => {
    let { xInt, yInt, letter, number } = this.props;
    if (xInt === 0 && yInt === 0)
      return <Bubble name='flag' />
    else if (xInt === 0) 
      return <Letter>{letter}</Letter>
    else if (yInt === 0)
      return <Letter>{number}</Letter>
    else
      return <Bubble name='circle' />
  }

  render() {
    return (
      <Container raised>
        { this.getChar() }
      </Container>
    )
  }
}

export default Sector
