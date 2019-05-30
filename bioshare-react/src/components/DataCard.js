import React, { Component } from "react";

class DataCard extends Component {
  constructor(props) {
    super(props);
    this.state = {isSelected:false};
  }

  toggleSelectionHandler = () =>{
    let isSelected = this.state.isSelected
    this.setState({isSelected : !isSelected})
  }

  render() {
    let props = this.props;
    let className = "data-card center-col "
    if(this.state.isSelected)
        className += "active"
    return (
      <div className={className} onClick={this.toggleSelectionHandler}>
        <div className="card-top center-col ">
          <i className="fas fa-address-card" />
        </div>
        <div className="card-bottom">{props.name}</div>
        <div className="popover">
          <h4>{props.name}</h4>
          <p>{props.desc}</p>
          <hr />
          <p>{props.status}</p>
        </div>
      </div>
    );
  }
}

export default DataCard;
