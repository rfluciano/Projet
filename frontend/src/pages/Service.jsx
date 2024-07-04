/* eslint-disable no-unused-vars */
import React from "react";
import "../style/service.css";

export default function Service() {
  return (
    <div className="contentService">
      <div className="t4div">
        <div className="card4" id="ride">
          <div className="content4">Contact</div>{" "}
          <img src="/images/contact_us.jpg" alt="ride" width={"250px"} />
        </div>
        <div className="card4" id="drive">
          <div className="content4">Drive</div>{" "}
          <img src="/images/about2.jpg" alt="drive" width={"250px"} height={250} />
        </div>
        <div className="card4" id="help">
          <div className="content4">Help</div>
          <img src="/images/help.jpg" alt="help" width={"250px"} />
        </div>
      </div>
    </div>
  );
}
