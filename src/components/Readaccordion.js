import React from 'react'
import { Accordion } from 'react-bootstrap';
import './accordstyles.css'

const Readaccordion = () => {

    return (
        <Accordion className="mt-6 p-3">
            <Accordion.Item eventKey="5" className="item">
                <Accordion.Header>
                    Lottery Number
                </Accordion.Header>
                <Accordion.Body>
                    This lottery makes 361 total lotteries to date.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="item">
                <Accordion.Header className="header">
                Jackpot Balance
                </Accordion.Header>
                <Accordion.Body>
                    0.0465 ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="item">
                <Accordion.Header>
                Winners Balance
                </Accordion.Header>
                <Accordion.Body>
                0.0789 ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="item">
                <Accordion.Header>
                Lottery Profits
                </Accordion.Header>
                <Accordion.Body>
                0.000736 ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className="item">
                <Accordion.Header>
                    Show Ticket Price
                </Accordion.Header>
                <Accordion.Body>
                    0.00055 ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7" className="item">
                <Accordion.Header>
                    Update Ticket Price
                </Accordion.Header>
                <Accordion.Body>
                    <button>Update Price</button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Readaccordion