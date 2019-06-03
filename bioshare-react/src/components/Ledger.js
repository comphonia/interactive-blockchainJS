import React, { Component } from "react";

class Ledger extends Component {
  state = { info: "" };

  updateInfo = newInfo => {
    this.setState({ info: newInfo });
  };

  render() {
    return (
      <div className="row">
        <div className="blockchain">
          <div className="info">
            <small style={{ display: "block" }}>Block Info:</small>
            <small style={{ display: "block" }} id="blockinfo">
              {this.state.info}
            </small>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-36px",
              fontSize: "1.2em",
              left: "-2px",
              border: "2px solid #462c1d",
              borderBottom: "transparent",
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
          <div className="blockarea" id="blockarea">
            {this.props.chainData.map((info, index) => (
              <Block key={index} id={index} info={info} hover={this.updateInfo}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const Block = props => {
  let info =  JSON.stringify(props.info, null, 2)
  return (
    <div className="block" onMouseOver={()=>props.hover(info)}>
      <i className="fas fa-cube" />
    </div>
  );
};

export default Ledger;
