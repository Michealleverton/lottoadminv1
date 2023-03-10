import React from 'react'
import './contractoverview.css'
import './Popup.css'

function ContractTDcopy() {

  const texttocopy = "0xAECc97279cE7B664561C1C0525bf6B159DB295C6"

  const copytoclipboard = () => {
    navigator.clipboard.writeText(texttocopy)
  }

  function showCopied() {
    let selectButton = document.querySelector(".copycontractaddress");
    selectButton.classList.add("active");
    setTimeout(function () {
      selectButton.classList.remove("active");
    }, 1500)
  }

  return (
    <div className="copycontractaddress">
      <div className='addresstext'>
      <h6><p id="text">Contract : 0xAECc97279cE7B664561C1C0525bf6B159DB295C6</p></h6>
    </div>
    <button value="copy" onClick={() => { copytoclipboard(); showCopied(); }} id="copy-text-btn"><i className="fa-regular fa-copy"></i></button>
</div>
  )
}

export default ContractTDcopy