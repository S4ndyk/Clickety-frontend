import React from 'react';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { usePoints } from './usePoints'
import { usePopUp } from './usePopUp';

const App = () => {
  const [points, click, restart] = usePoints(20)
  const [tillNextPopUp, setTillNextPopUp] = usePopUp()
  const [prizePopUp, setPrizePopUp] = usePopUp()

  const handleClick = () => {
    const [tillNext, prize] = click()
    if (tillNext > 0) {
      setTillNextPopUp(`ONLY ${tillNext} CLICKS UNTIL NEXT PRIZE`)
    }
    if (prize > 0) {
      setPrizePopUp(`CONGRATULATION YOU WON ${prize} POINTS!!`)
    }
  }

  return (
    <div className='container'>
      <Container>
        <Row>
          {prizePopUp ? <Alert variant='success' >{prizePopUp}</Alert> : null}
        </Row>
        <Row>
          <Badge variant='info'><h2>points: {points}</h2></Badge>
        </Row>
        <Row>
          {tillNextPopUp ? <Alert variant='primary' >{tillNextPopUp}</Alert> : null}
        </Row>
        <Row>
          <Button type='button' onClick={handleClick}>click me</Button>
          {points <= 0 ? <Button type='button' onClick={restart} >restart</Button> : null}
        </Row>
      </Container>
    </div>
  )
}

export default App
