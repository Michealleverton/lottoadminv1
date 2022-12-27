import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import './contractoverview.css'

const lottery_ABI = [
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
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "winmsg",
        "type": "string"
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
    "inputs": [],
    "name": "PauseContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "randomness",
        "type": "uint256"
      }
    ],
    "name": "rawFulfillRandomness",
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
    "inputs": [],
    "name": "UnpauseContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
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
    "inputs": [],
    "name": "ticketcount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const PROVIDER = `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_RINKEBY_KEY}`;
const OD_CONTRACT_ADDRESS = process.env.REACT_APP_ODCONTRACT_ADDRESS;
const TD_CONTRACT_ADDRESS = process.env.REACT_APP_TDCONTRACT_ADDRESS;
const FF_CONTRACT_ADDRESS = process.env.REACT_APP_FFCONTRACT_ADDRESS;

function Home() {

  const [ODbalance, setODbalance] = useState(0);
  const [TDbalance, setTDbalance] = useState(0);
  const [FFbalance, setFFbalance] = useState(0);

  useEffect(() => {
    const web3 = new Web3(PROVIDER);
    const ODcontract = new web3.eth.Contract(lottery_ABI, OD_CONTRACT_ADDRESS);
		const TDcontract = new web3.eth.Contract(lottery_ABI, TD_CONTRACT_ADDRESS);
		const FFcontract = new web3.eth.Contract(lottery_ABI, FF_CONTRACT_ADDRESS);

    ODcontract.methods.getBalance().call()
      .then(setODbalance)
    TDcontract.methods.getBalance().call()
      .then(setTDbalance)
    FFcontract.methods.getBalance().call()
      .then(setFFbalance)
  }, [])

  return (
    <section>

      <div className='container homeinfoholder'>

        <div className=" container overviewheader text-white">
          <h5>One Dollar Lottery</h5>
        </div>
        <div className="container ODoverviewbody text-white">
          <div>
            <div className='mb-3'>
              <div className='mb-3'>Jackpot Balance :&nbsp; <h6>{(ethers.utils.formatEther(ODbalance))} ETH</h6></div>
            </div>
            <div>
              <div className='mb-3'>Winners Balance : &nbsp;<h6>{((ethers.utils.formatEther(ODbalance) / 1000) * 100).toFixed(5)} ETH</h6></div>
            </div>

            <div>
              <div className='mb-3'>Final Profits : &nbsp;<h6>{((ethers.utils.formatEther(ODbalance) / 1000) * 900).toFixed(5)} ETH</h6></div>
            </div>
          </div>
        </div>

        <div className=" container overviewheader text-white">
          <h5>Two Dollar Lottery</h5>
        </div>
        <div className="container TDoverviewbody text-white">
          <div>
            <div className='mb-3'>
              <div className='mb-3'>Jackpot Balance :&nbsp; <h6>{(ethers.utils.formatEther(TDbalance))} ETH</h6></div>
            </div>
            <div>
              <div className='mb-3'>Winners Balance : &nbsp;<h6>{((ethers.utils.formatEther(TDbalance) / 1000) * 200).toFixed(5)} ETH</h6></div>
            </div>

            <div>
              <div className='mb-3'>Final Profits : &nbsp;<h6>{((ethers.utils.formatEther(TDbalance) / 1000) * 800).toFixed(5)} ETH</h6></div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className=" container overviewheader text-white">
            <h5>Fifty Fifty Lottery</h5>
          </div>
          <div className="container FFoverviewbody text-white">
            <div>
              <div className='mb-3'>
                <div className='mb-3'>Jackpot Balance :&nbsp; <h6>{(ethers.utils.formatEther(FFbalance))} ETH</h6></div>
              </div>
              <div>
                <div className='mb-3'>Winners Balance : &nbsp;<h6>{((ethers.utils.formatEther(FFbalance) / 1000) * 500).toFixed(5)} ETH</h6></div>
              </div>

              <div>
                <div className='mb-3'>Final Profits : &nbsp;<h6>{((ethers.utils.formatEther(FFbalance) / 1000) * 500).toFixed(5)} ETH</h6></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Home;