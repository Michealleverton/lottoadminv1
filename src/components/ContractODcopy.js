import React from 'react'
import './contractoverview.css'
import './Popup.css'

function ContractODcopy() {

  const copytoclipboard = () => {
    navigator.clipboard.writeText("0xCA5480152F30BCF9d147E0fcdfdF865EB5995e05")
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
      <div className='addresstext '>
        <h6><p>Contract : 0xCA5480152F30BCF9d147E0fcdfdF865EB5995e05</p></h6>
      </div>
      {/* <input type='text' className='text text-white bg_darkblue me-2' value='0xCA5480152F30BCF9d147E0fcdfdF865EB5995e05'></input> */}
      <button value="copy" onClick={() => { copytoclipboard(); showCopied(); }} id="copy-text-btn"><i className="fa-regular fa-copy"></i></button>
    </div>
  )
}

export default ContractODcopy