import React from "react";
import './accordstyles.css';
import Readaccordion from "./Readaccordion";
import Writeaccordion from "./Writeaccordion";
import TDcontractoverview from "./TDcontractoverview";

function panelrefresh() {
  window.location.reload()
}

function Home() {
  return (  
    <section>

      <div>
      <TDcontractoverview />
      </div>

      <div className="container accordcontain">
        {/* <Contractinfo /> */}
        <div className="accordcontainer">
        <div className="refresher"><button className="refresh_button_link" type="submit"  onClick={() => {
								panelrefresh();
							}}>Refresh</button></div>
          <Readaccordion />
        </div>
        <div className="accordcontainer">
          <Writeaccordion />
        </div>
      </div>

    </section>
  );
}

export default Home;