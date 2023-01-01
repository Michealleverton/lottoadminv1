import React from "react";
import './accordstyles.css';
import Readaccordion from "./Readaccordion";
import Writeaccordion from "./Writeaccordion";
import FFcontractoverview from "./FFcontractoverview";

function panelrefresh() {
  window.location.reload()
}

function FFlottery() {
  return (  
    <section>

      <div>
      <FFcontractoverview />
      </div>

      <div className="container accordcontain">
        {/* <Contractinfo /> */}
        <div className="accordcontainer">
        <div className="refresher"><a href="/" onClick={() => {
								panelrefresh();
							}}>Refresh</a></div>
          <Readaccordion />
        </div>
        <div className="accordcontainer">
          <Writeaccordion />
        </div>
      </div>

    </section>
  );
}

export default FFlottery;