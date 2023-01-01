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