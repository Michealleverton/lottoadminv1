import React from 'react'
import './contractoverview.css'

function ContractTDcopy() {
  return (
    <div className="copycontractaddress">
      <div className='addresstext'>
      <h6><p id="text">Contract : 0xAECc97279cE7B664561C1C0525bf6B159DB295C6</p></h6>
    </div>
    <button id="copy-text-btn"><i className="fa-regular fa-copy"></i></button>
</div>
  )
}

export default ContractTDcopy