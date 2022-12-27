import React from 'react'
import ContractODcopy from "./ContractODcopy";
import './contractoverview.css'

function ODcontractoverview() {
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
                                <div><h6>0.00465 ETH</h6></div>
                            </div>
                            <div>
                                <div className=''>Tokens</div>
                                <div><h6>Link : 2.6 Link</h6></div>
                            </div>
                        </div>
                        <div>
                            <div className=''>Ticket Count : </div><div className='mb-3'><h6>365 Sold</h6></div>
                            <div className=''>Free Ticket Count : </div><div><h6>78 Given Out</h6></div>
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
                                <div className='me-6-1 mb-3'>Contract Name : <h6>OneDollarTicket</h6> </div>
                            </div>
                            <div>
                            <div className=''>Contract Creator : <h6>0x3AA0Df703D0086495a3317A3e...</h6></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default ODcontractoverview