import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { Accordion } from 'react-bootstrap';
import './accordstyles.css'

const lottery_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lottonum",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "FreePlay",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "ticketnum",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "GiftGiven",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "randomWords",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "payment",
                "type": "uint256"
            }
        ],
        "name": "RequestFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "numWords",
                "type": "uint32"
            }
        ],
        "name": "RequestSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lottonum",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "TransferReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "destAddr",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "lottonum",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "TransferSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lottonum",
                "type": "uint256"
            }
        ],
        "name": "ticketnumber",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "PauseContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "UnpauseContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "enterDraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "finalizeFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "freePlayCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentPlayers",
        "outputs": [
            {
                "internalType": "address payable[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestId",
                "type": "uint256"
            }
        ],
        "name": "getRequestStatus",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "paid",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "fulfilled",
                "type": "bool"
            },
            {
                "internalType": "uint256[]",
                "name": "randomWords",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getShowTicketPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTicketCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "lottery",
                "type": "uint256"
            }
        ],
        "name": "getWinnerByLottery",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastRequestId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "lotteryHistory",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lotteryId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "payWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_ticketprice",
                "type": "uint256"
            }
        ],
        "name": "priceUpdate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestId",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_randomWords",
                "type": "uint256[]"
            }
        ],
        "name": "rawFulfillRandomWords",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "resetCurrentLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawLink",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
const PROVIDER = `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_RINKEBY_KEY}`;
const OD_CONTRACT_ADDRESS = process.env.REACT_APP_ODCONTRACT_ADDRESS;

const Readaccordion = () => {

    const [ticketPrice, setTicketPrice] = useState(0);
    const [ODbalance, setODbalance] = useState(0);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const web3 = new Web3(PROVIDER);
        const ODcontract = new web3.eth.Contract(lottery_ABI, OD_CONTRACT_ADDRESS);

        ODcontract.methods.getBalance().call()
            .then(setODbalance)
        ODcontract.methods.getShowTicketPrice().call()
            .then(setTicketPrice)

    }, [])

    useEffect(() => {
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            web3.eth.getAccounts().then(setAccounts);
            console.log(accounts)
        }
    }, [])

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
                {(ethers.utils.formatEther(ODbalance))} ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="item">
                <Accordion.Header>
                Winners Balance
                </Accordion.Header>
                <Accordion.Body>
                {((ethers.utils.formatEther(ODbalance) / 1000) * 100).toFixed(5)} ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="item">
                <Accordion.Header>
                Lottery Profits
                </Accordion.Header>
                <Accordion.Body>
                {((ethers.utils.formatEther(ODbalance) / 1000) * 900).toFixed(5)} ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className="item">
                <Accordion.Header>
                    Show Ticket Price
                </Accordion.Header>
                <Accordion.Body>
                {(ethers.utils.formatEther(ticketPrice))} ETH
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7" className="item">
                <Accordion.Header>
                    Update Ticket Price
                </Accordion.Header>
                <Accordion.Body>
                    <div className='priceupdate_container'>
                    <input className='priceupdateinput' type="number" id="priceupdate" name="priceupdate" placeholder='Enter price' />
                    <button className='priceupdate_btn'>Update Price</button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Readaccordion