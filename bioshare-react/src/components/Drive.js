import React, { Component } from "react";
import { DataCard, DataChip } from "./DataComponents";

class Drive extends Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "", selectedInventory: [] };
  }

  //clean up drive when switching to a new user, data persists on the same user
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ searchValue: "" });
      this.setState({ selectedInventory: [] });
    }
  }

  refreshComponent=()=>{
    this.setState({ searchValue: "" });
    this.setState({ selectedInventory: [] });
  }

  //close the modal
  closeDrive = event => {
    if (
      event.target.className === "modal show" ||
      event.target.className === "close-drive"
    ) {
      this.props.toggleDrive();
    }
  };

  // push ids of selected inventory items
  toggleSelectionHandler = data => {
    let selectedItems = [...this.state.selectedInventory];
    if (selectedItems.includes(data))
      selectedItems = selectedItems.filter(item => item !== data);
    else selectedItems.push(data);
    this.setState({ selectedInventory: selectedItems });
  };

  getSelectedData = data => {
    return this.state.selectedInventory.includes(data);
  };

  clearInventory = () => {
    this.setState({ selectedInventory: [] });
  };

  onSearchHandler = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    let props = this.props;
    let filteredData = [];
    if (props.data !== undefined) {
      filteredData = props.data;
      filteredData = filteredData.filter(data =>
        data.name.includes(this.state.searchValue)
      );
    }

    return (
      <div
        className={props.visibility ? "modal show" : "modal"}
        onClick={event => this.closeDrive(event)}
      >
        <div className="modal-inner">
          <div className="modal-top center-row">
            <h2>{props.name + "'s Database" + (props.type === "npc" ? " (read-only)" : "")}</h2>
            <button
              className="close-drive"
              onClick={event => this.closeDrive(event)}
            >
              ×
            </button>
          </div>
          {/* bottom modal */}
          {props.type === "player" ? (
            <BottomModal
              data={this.state.selectedInventory}
              deleteChip={this.toggleSelectionHandler}
              shareData={props.shareData}
              refresh={(this.refreshComponent)}
            />
          ) : null}
          <div className="modal-guts">
            <div className="searchArea">
              <div className="searchBar center-col">
                <input
                  type="text"
                  placeholder="Search for evidence"
                  value={this.state.searchValue}
                  onChange={event => this.onSearchHandler(event)}
                />
                <i className="fas fa-search searchIcon" />
              </div>
            </div>
            <div className="database">
              {/* render inventory items */}
              {filteredData.length > 0
                ? filteredData.map(data => {
                    return (
                      <DataCard
                        key={data.id}
                        id={data.id}
                        name={data.name}
                        desc={data.desc}
                        image={data.image}
                        status={data.status}
                        isSelected={this.getSelectedData(data)}
                        isDataShared={props.isDataShared(data)}
                        onClick={() => this.toggleSelectionHandler(data)}
                        type={props.type}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const BottomModal = props => {
  return (
    <div className="modal-bottom">
      <div className="data-queue">
        {/* render data chips */}
        {props.data.map(data => {
          return (
            <DataChip
              key={data.id}
              name={data.name}
              image={data.image}
              onClick={() => props.deleteChip(data)}
            />
          );
        })}
      </div>
      <div className="button" onClick={props.refresh}>
        <button className={props.data.length > 0 ? "btn" : "btn disabled"} onClick={props.data.length > 0 ? () => props.shareData(props.data) : null}>
          <i className="far fa-paper-plane" style={{ marginRight: "10px" }} />
          Send
        </button>
      </div>
    </div>
  );
};

export default Drive;
