import React from "react";

const Card = props => {
  return (
    <div className="col1">
      <div className="card">
        <h2>{props.name}</h2>
        <div className="imagearea center-row">
          <img src={props.avatar} alt="avatar" />
        </div>
        <p>{props.title}</p>
        <CardButton type={props.type} btnClick={props.btnClick}/>
        {props.children}
      </div>
    </div>
  );
};

const CardButton = props => {

    let style = {backgroundColor:'#2A9D8F'}
    let className = "fas fa-share-square";
    let desc = "share evidence"
    if(props.type === "npc"){
        style.backgroundColor = '#476476'
        className = "fas fa-hdd"
        desc = "view bio drive"
    }

  return (
    <div className="buttons center-col">
      <button className="btn" style={style} onClick={props.btnClick}>
        <i className={className} />
        <div>{desc}</div>
      </button>
    </div>
  );
};

export default Card;
