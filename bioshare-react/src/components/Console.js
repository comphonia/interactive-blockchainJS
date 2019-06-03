import React from "react";
import Time from "./Time";
const moment = require('moment')

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
              return <p key={index}>{moment().format("h:mm:ss a") + " -> " +  entry}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

export default Console;
