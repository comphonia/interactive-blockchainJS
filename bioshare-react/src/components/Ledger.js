import React from "react";
const Ledger = () => {
  return (
    <div className="row">
      <div className="blockchain">
        <div className="info">
          <small style={{ display: "block" }}>Block Info:</small>
          <small style={{ display: "block" }} id="blockinfo" />
        </div>
        <div
          style={{
            position: "absolute",
            top: "-38px",
            fontSize: "1.2em",
            left: 0,
            border: "2px solid #462c1d",
            boxShadow: "inset 0 1px 5px rgba(0, 0, 0, 0.5)",
            padding: "5px",
            backgroundColor: "#264653",
            color: "#f5f5f5",
            fontFamily: "Consolas, monaco, monospace",
            fontWeight: 600
          }}
        >
          LEDGER
        </div>
        <div className="blockarea" id="blockarea" />
      </div>
    </div>
  );
};

export default Ledger;
