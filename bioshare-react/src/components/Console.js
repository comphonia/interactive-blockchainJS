import React from "react";
import Time from "./Time";

const Console = (props) => {
    return (
      <div className="col2">
        <div className="transactions">
          <div className="titlebar">
            <span>&gt;&gt; console</span>
            <button style={{ margin: 0 }} onClick={props.clearConsole}>
              clear
            </button>
            <span>
              <Time />
            </span>
          </div>
          <div className="log">
            {props.consoleEntries.map((entry,index) => {
              return <p key={index}>{entry}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

export default Console;