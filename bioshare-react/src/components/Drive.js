import React from "react";
import DataCard from './DataCard'

const Drive = props => {
  const closeDrive = event => {
    if (event.target.className === "modal show") props.btnClick();
  };

  return (
    <div
      className={props.visibility ? "modal show" : "modal"}
      onClick={event => closeDrive(event)}
    >
      <div className="modal-inner">
        <div className="modal-top center-row">
          <h2>{props.name + "'s Database"}</h2>
          <button onClick={props.btnClick}>×</button>
        </div>
        {/* bottom modal */}
        {props.type === "player" ? <BottomModal /> : null}
        <div className="modal-guts">
          <div className="searchArea">
            <div className="searchBar center-col">
              <input type="text" placeholder="Search for evidence" onChange={props.onSearch}/>
              <i className="fas fa-search searchIcon" />
            </div>
          </div>
          <div className="database">
            {/* render inventory items */}
            {props.data !== undefined
              ? props.data.map(data => {
                  return (
                    <DataCard
                      key={data.id}
                      name={data.name}
                      desc={data.desc}
                      status={data.status}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomModal = () => {
  return (
    <div className="modal-bottom">
      <div className="data-queue">{/* render data chips */}</div>
      <div className="button">
        <button className="btn">
          <i className="far fa-paper-plane" style={{ marginRight: "10px" }} />
          Send
        </button>
      </div>
    </div>
  );
};



const DataChip = props => {
  return (
    <div className="chip">
      <i className="fas fa-address-card" style={{ verticalAlign: "bottom" }} />
      <span>{props.name}</span>
      <button className="chip-close">×</button>
    </div>
  );
};

export default Drive;
