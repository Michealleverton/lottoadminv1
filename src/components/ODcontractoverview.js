import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import ContractODcopy from "./ContractODcopy";
import './contractoverview.css'

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

function ODcontractoverview() {

    const [ticketCount, setODTicketCount] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [ODbalance, setODbalance] = useState(0);
    const [freePlayCount, setFreePlayCount] = useState(0);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const web3 = new Web3(PROVIDER);
        const ODcontract = new web3.eth.Contract(lottery_ABI, OD_CONTRACT_ADDRESS);

        ODcontract.methods.getBalance().call()
            .then(setODbalance)
        ODcontract.methods.getTicketCount().call()
            .then(setODTicketCount)
        ODcontract.methods.freePlayCount().call()
            .then(setFreePlayCount)
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
        <section>
            <div className="container copytextContainer text-white">
                <ContractODcopy />
            </div>
            <div className='container allinfoholder'>

                <div className='container infoholder'>
                    <div className=" container overviewheader text-white">
                        <h6>Contract Overview</h6>
                    </div>
                    <div className="container overviewbody text-white">
                        <div>
                            <div className='mb-3'>
                                <div className='me-6-1 '>Etherium : </div>
                                <div><h6>{(ethers.utils.formatEther(ODbalance))} ETH</h6></div>
                            </div>
                            <div>
                                <div className=''>Ticket Price</div>
                                <div><h6>{(ethers.utils.formatEther(ticketPrice))} ETH</h6></div>
                            </div>
                        </div>
                        <div>
                            <div className=''>Ticket Count : </div><div className='mb-3'><h6>{ticketCount} Sold</h6></div>
                            <div className=''>Free Ticket Count : </div><div><h6>{freePlayCount} Given Out</h6></div>
                        </div>
                    </div>
                </div>

                <div className='container infoholder'>
                    <div className=" container overviewheader text-white">
                        <h6>More Info</h6>
                    </div>
                    <div className="container overviewbody text-white">
                        <div>
                            <div className=''>
                                <div className='me-6-1 mb-3'>Contract Name : <h6><a className='cleanlink' href="https://goerli.etherscan.io/address/0xCA5480152F30BCF9d147E0fcdfdF865EB5995e05#code">OneDollarTicket</a></h6> </div>
                            </div>
                            <div>
                                <div className='mb-1'>Transaction Number : <h6>0x47192400f7f45c351ca4f8a79a...</h6></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default ODcontractoverview