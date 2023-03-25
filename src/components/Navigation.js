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
          localStorage.setItem("connected address", accounts[0]);
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
    localStorage.setItem("connected address", walletResponse.address)
  };
const nummy = 2
  // * Navbar html to display App itmes

  return (
    <header className="header sticky-top mypx-3 bg_darkblue bottomblackline myshadow-lg">
      <nav className="navbar navbar-expand-lg">
        <div className="mycontainer">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <a className="nav-link test text-white logoml" href="https://decentralizlottery.netlify.app/"><h2>Decentraliz Lottery</h2></a>

            <div className="navbar-collapse text-center">
              <ul className="nav ms-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><NavLink className="nav-link" to="/#">Home</NavLink></li>
                <li><NavLink className="nav-link" to="/ODlottery">One Dallar Lottery</NavLink></li>
                <li><NavLink className="nav-link" to="/TDlottery">Two Dallar Lottery</NavLink></li>
                <li><NavLink className="nav-link" to="/FFlottery">Fifty Fifty Lottery</NavLink></li>
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

                  {nummy > 0 ? (
                    <span>Connected</span>
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