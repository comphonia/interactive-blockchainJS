import React from "react";

const Console = () => {
  return (
    <div className="col2">
      <div className="transactions">
        <div className="titlebar">
          <span>&gt;&gt; console</span>
          <button style={{ margin: 0 }}>
            clear
          </button>
          <span id="consoleTime" />
        </div>
        <div className="log" id="console" />
      </div>
    </div>
  );
};

export default Console;
