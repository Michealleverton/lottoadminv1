import React from "react";
import './accordstyles.css';
import Readaccordion from "./Readaccordion";
import Writeaccordion from "./Writeaccordion";
import ODcontractoverview from "./ODcontractoverview";

function panelrefresh() {
  window.location.reload()
}

function ODlottery() {
  return (  
    <section>

      <div>
      <ODcontractoverview />
      </div>

      <div className="container accordcontain">
        {/* <Contractinfo /> */}
        <div className="accordcontainer">
          <div className="refresher"><a href="/#" rel="noopener" type="submit" onClick={() => {
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

export default ODlottery;