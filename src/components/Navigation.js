import { React, useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected //import here
} from "../utils/interact";
import { NavLink } from "react-router-dom";

const Navigation = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [, setStatus] = useState("");

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          localStorage.setItem("connected address", accounts[0])
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address)
      setStatus(status);
      localStorage.setItem("connected address", address)
      addWalletListener();
    }
    fetchData();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    localStorage.setItem("connected address",walletResponse.address)
  };

  // * Navbar html to display App itmes

  return (
    <header className="header sticky-top mypx-3 bg_darkblue bottomblackline myshadow-lg">
      <nav className="navbar navbar-expand-lg">
        <div className="mycontainer">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <NavLink className="nav-link test text-white logoml" to="/"><h2>Decentraliz Lottery</h2></NavLink>

            <div className="navbar-collapse text-center">
              <ul className="nav ms-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink className="nav-link" to="#/">Home</NavLink></li>
                <li><NavLink className="nav-link" to="/ODlottery">One Dallar Lottery</NavLink></li>
                <li><NavLink className="nav-link" to="/TDlottery">Two Dallar Lottery</NavLink></li>
                <li><NavLink className="nav-link" to="/FFlottery">Fifty Fifty Lottery</NavLink></li>

                {/* <li><a href="#home" className="mynavlinks nav-link px-2">HOME</a></li>
                <li><a href="#tickets" className="mynavlinks nav-link px-2">TICKETS</a></li>
                <li><a href="#mytickets" className="mynavlinks nav-link px-2">MY TICKETS</a></li>
                <li><a href="#specialdraws" className="mynavlinks nav-link px-2">SPECIAL DRAWS</a></li> */}
              </ul>
              <div className="">
                <button className="my_btn btn-warning" onClick={connectWalletPressed}>
                  {walletAddress.length > 0 ? (
                    "Account: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;