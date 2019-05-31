import React from "react";

const DataCard = props => {
  let className = "data-card center-col ";
  if (props.isDataShared) className += "disabled ";
  else if (props.isSelected && props.type !== "npc") className += "active ";
  return (
    <div className={className} onClick={props.isDataShared ? null : props.onClick}>
      <div className="card-top center-col ">
        <i className={props.image} />
      </div>
      <div className="card-bottom">{props.name}</div>
      <div className="popover">
        <h4>{props.name}</h4>
        <p>{props.desc}</p>
        <hr />
        <p>
          {props.isDataShared ? "synced with current user" : "ready to share"}
        </p>
      </div>
    </div>
  );
};

const DataChip = props => {
  return (
    <div className="chip" onClick={props.onClick}>
      <i
        className={props.image}
        style={{ verticalAlign: "bottom", marginRight: 10 }}
      />
      <span>{props.name}</span>
      <button className="chip-close">×</button>
    </div>
  );
};

export { DataCard, DataChip };
