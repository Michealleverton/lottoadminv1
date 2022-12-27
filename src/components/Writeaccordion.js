import React from 'react'
import { Accordion } from 'react-bootstrap';
import './accordstyles.css'

const Writeaccordion = () => {

  return (
    <Accordion className="mt-6 p-3">
      <Accordion.Item eventKey="1" className="item">
        <Accordion.Header className="header">
          Pause Contract
        </Accordion.Header>
        <Accordion.Body>
          <button>Pause</button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className="item">
        <Accordion.Header>
          Pick Winner
        </Accordion.Header>
        <Accordion.Body>
          <button>Pick Random Winner</button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className="item">
        <Accordion.Header>
          Pay Winner
        </Accordion.Header>
        <Accordion.Body>
          <button>Handout Winnings</button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" className="item">
        <Accordion.Header>
          Finalize Lottery
        </Accordion.Header>
        <Accordion.Body>
          <button>Witdraw Profits / Reset Lottery</button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className="item">
        <Accordion.Header>
          Unpause Contract
        </Accordion.Header>
        <Accordion.Body>
          <button>Unpause</button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7" className="item">
        <Accordion.Header>
          Is Contract Paused
        </Accordion.Header>
        <Accordion.Body>
          Unpaused
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Writeaccordion