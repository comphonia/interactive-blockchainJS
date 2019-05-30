import React, { Component } from "react";
import "./css/start.css";

import aliceAvatar from "./imgs/fem1.png";
import bobAvatar from "./imgs/male1.png";
import kwanAvatar from "./imgs/male2.png";

import Topbar from "./components/Topbar";
import Card from "./components/Card";
import Console from "./components/Console";
import Ledger from "./components/Ledger";
import Drive from "./components/Drive";

class App extends Component {
  state = {
    viewDrive: false,
    npcCounter: 0,
    filteredList: [],
    driveSelection: [],
    playerData: [
      {
        id: "0",
        name: "Alice",
        type: "player",
        title: "Crime Scene Investigator",
        avatar: aliceAvatar,
        inventory: [
          {
            id: "0",
            name: "wine-glass",
            image: "fas fa-wine-glass-alt",
            desc: "forensic data collected from evidence at a crime scene",
            status: ""
          },
          {
            id: "1",
            name: "user-injured",
            image: "fas fa-user-injured",
            desc: "biometrics from injured victim at a crime scene",
            status: ""
          }
        ]
      }
    ],
    npcData: [
      {
        id: "1",
        name: "Bob",
        type: "npc",
        title: "Detective",
        avatar: bobAvatar,
        inventory: []
      },
      {
        id: "2",
        name: "Kwan",
        type: "npc",
        title: "Forensic Artist",
        avatar: kwanAvatar,
        inventory: []
      }
    ]
  };

  prevNpcHandler = () => {
    let count = this.state.npcCounter;
    if (count !== 0) {
      this.setState({ npcCounter: count - 1 });
    }
  };

  nextNpcHandler = () => {
    let count = this.state.npcCounter;
    if (count < this.state.npcData.length - 1) {
      this.setState({ npcCounter: count + 1 });
    }
  };

  searchDatabase = (id, event) => {
    event.preventDefault();
    let data = [
      ...this.state.playerData,
      ...this.state.npcData
    ];

    let currdata = data.filter(dta => dta.id === id);
    let searchData = currdata[0].inventory.filter(dta => dta.name.includes(event.target.value));
    this.setState({ filteredList: searchData });
  };

  driveProps = {};

  toggleDriveHandler = id => {
    let visibility = !this.state.viewDrive;
    this.setState({ viewDrive: visibility });
    if (visibility) {
      let data = [...this.state.playerData, ...this.state.npcData];
      let currdata = data.filter(dta => dta.id === id);
      this.driveProps.id = currdata[0].id;
      this.driveProps.name = currdata[0].name;
      this.driveProps.type = currdata[0].type;
      this.setState({filteredList : currdata[0].inventory})
    }
  };

  render() {
    let playerData = this.state.playerData[0];
    let npcData = this.state.npcData;
    let counter = this.state.npcCounter;

    return (
      <div>
        <div className="container">
          <Topbar />
          <div className="wrapper">
            <div className="row">
              {/* player card */}
              <Card
                name={playerData.name}
                title={playerData.title}
                avatar={playerData.avatar}
                btnClick={() => this.toggleDriveHandler(playerData.id)}
              />
              {/* console widget */}
              <Console />
              {/* npc card */}
              <Card
                name={npcData[counter].name}
                title={npcData[counter].title}
                avatar={npcData[counter].avatar}
                btnClick={() => this.toggleDriveHandler(npcData[counter].id)}
                type={npcData[counter].type}
              >
                <div className="nav">
                  <button className="left" onClick={this.prevNpcHandler}>
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button className="right" onClick={this.nextNpcHandler}>
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </Card>
            </div>
            {/* ledger widget */}
            <Ledger />
          </div>
        </div>
        <Drive
          name={this.driveProps.name}
          data={this.state.filteredList}
          type={this.driveProps.type}
          btnClick={() => this.toggleDriveHandler(this.driveProps.id)}
          visibility={this.state.viewDrive}
          onSearch = {(event)=>this.searchDatabase(this.driveProps.id,event)}
        />
      </div>
    );
  }
}

export default App;
