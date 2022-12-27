import React from 'react'
import ContractFFcopy from "./ContractFFcopy";
import './contractoverview.css'

function FFcontractoverview() {
    return (
        <section>
            <div className="container copytextContainer text-white">
                <ContractFFcopy />
            </div>
            <div className='container allinfoholder'>
                <div className='container infoholder'>
                    <div className=" container overviewheader text-white">
                        <h6>Contract Overview</h6>
                    </div>
                    <div className="container overviewbody text-white">
                        <div>
                            <div className='mb-3'>
                                <div className='me-6-1 '>Etherium : </div><div><h6>0.2633 ETH</h6></div>
                            </div>
                            <div>
                                <div className=''>Tokens</div>
                                <h6>
                                    <div>Link : 6.2 Link</div>
                                </h6>
                            </div>
                        </div>
                        <div>
                            <div className=''>Ticket Count : </div><div className='mb-3'><h6>123669 Sold</h6></div>
                            <div className=''>Free Ticket Count : </div><div><h6>13365 Given Out</h6></div>
                        </div>
                    </div>
                </div>

                <div className='container infoholder'>
                    <div className=" container overviewheader text-white">
                        <h6>More Info</h6>
                    </div>
                    <div className="container overviewbody text-white">
                        <div>
                            <div className='mb-3'>
                                <div className='me-6-1 mb-3'>Contract Name : <h6>FiftyFiftyTicket</h6> </div>
                            </div>
                            {/* <div>
                            <div className='mb-3'>Contract Creator : <h6>0x3AA0Df703D0086495a3317A3e...</h6></div>
                            </div> */}
                            <div>
                            <div className='mb-1'>Transaction Number : <h6>0x2ccaf735e64ea68957ec8c3b3d...</h6></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FFcontractoverview