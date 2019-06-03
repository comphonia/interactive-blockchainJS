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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {Blockchain , Transaction} from './js/blockchain'

const moment = require('moment')
const loCloneDeep = require('lodash.clonedeep');

class App extends Component {
  state = {
    chain:[],
    viewDrive: false,
    npcCounter: 0,
    driveSelection: [],
    consoleEntries: [],
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
            name: "wine glass",
            image: "fas fa-wine-glass-alt",
            desc: "forensic data collected from evidence at a crime scene",
            status: ""
          },
          {
            id: "1",
            name: "injured person",
            image: "fas fa-user-injured",
            desc: "biometrics from injured victim at a crime scene",
            status: ""
          },
          {
            id: "2",
            name: "fingerprint",
            image: "fas fa-fingerprint",
            desc: "biometrics from injured victim at a crime scene",
            status: ""
          },
          {
            id: "3",
            name: "skull",
            image: "fas fa-skull",
            desc: "biometrics from injured victim at a crime scene",
            status: ""
          },
          {
            id: "4",
            name: "stolen badge",
            image: "fas fa-id-badge",
            desc: "forensic data collected from evidence at a crime scene",
            status: ""
          },
          {
            id: "5",
            name: "dna sample",
            image: "fas fa-dna",
            desc: "biometrics from injured victim at a crime scene",
            status: ""
          },
          {
            id: "6",
            name: "last voicemail of a victim",
            image: "fas fa-file-audio",
            desc: "forensic data collected from evidence at a crime scene",
            status: ""
          },
          {
            id: "8",
            name: "money",
            image: "fas fa-money-bill-alt",
            desc: "forensic data collected from evidence at a crime scene",
            status: ""
          },
          {
            id: "9",
            name: "body tissue",
            image: "fas fa-allergies",
            desc: "biometrics from injured victim at a crime scene",
            status: ""
          },
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
        inventory: [
          {
            id: "7",
            name: "wine-glass",
            image: "fas fa-wine-glass-alt",
            desc: "forensic data collected from evidence at a crime scene",
            status: ""
          }
        ]
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

  demoCoin = null;

  componentDidMount(){
    this.demoCoin = new Blockchain();
    this.setState({ consoleEntries:[moment().format("h:mm:ss a") + " -> secure peer-to-peer server initialized..."],chain: [...this.demoCoin.chain]});
  }

  //show toast notification
  notify = message => toast( message ,{
    position:"bottom-right",
    autoClose: 3000
  });

  //called when data is sent
  shareDataHandler = data => {
   // let fromId = 0;
    let toId = this.state.npcData[this.state.npcCounter].id;

    // npcData with toId.inventory.push data
    let tempNpcData = loCloneDeep(this.state.npcData);
    let npcIndex = tempNpcData.findIndex(npc => npc.id === toId);

    let entries = [...this.state.consoleEntries];
    let dataCount = 0;

    for (let dta of data) {
      tempNpcData[npcIndex].inventory.push(dta); //mutates state in nested inventory due to shallow cloning, needs fixing :(
      // add transaction
      let text = `Alice shared ${dta.name} to ${
        tempNpcData[npcIndex].name
      }`;
     // entries.push(text);
     this.notify(text);
     dataCount++;
    }

    
    this.demoCoin.createTransaction(new Transaction(Date.now(), 'drive-Alice', "drive-"+tempNpcData[npcIndex].name, parseInt(dataCount)))
    this.demoCoin.mineCurrentBlock('drive-Miner49r')

    entries.push(moment().format("h:mm:ss a") + " -> " + this.demoCoin.newBlock.message)

    
    this.setState({ consoleEntries: entries , chain: [...this.demoCoin.chain]});

    this.toggleDriveHandler(0);
  };

  clearConsoleHandler = () => {
    this.setState({ consoleEntries: [] });
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

  //checks shared data between user and npc to prevent redundancy
  isDataSharedHandler = data => {
    let fromId = 0; //user
    let toId = this.state.npcData[this.state.npcCounter].id;

    let tempPlayerData = [...this.state.playerData];
    let playerIndex = tempPlayerData.findIndex(player => player.id === fromId);

    let tempNpcData = [...this.state.npcData];
    let npcIndex = tempNpcData.findIndex(npc => npc.id === toId);
    if (
      tempPlayerData[0].inventory.includes(data) &&
      tempNpcData[npcIndex].inventory.includes(data)
    ) {
      return true;
    }
    return false;
  };

  driveProps = {};

  //show the modal with correct user data
  toggleDriveHandler = id => {
    let visibility = !this.state.viewDrive;
    this.setState({ viewDrive: visibility });
    if (visibility) {
      let data = [...this.state.playerData, ...this.state.npcData];
      let currdata = data.filter(dta => dta.id === id);
      this.driveProps.id = currdata[0].id;
      this.driveProps.name = currdata[0].name;
      this.driveProps.type = currdata[0].type;
      this.driveProps.data = currdata[0].inventory;
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
              <Console
                clearConsole={this.clearConsoleHandler}
                consoleEntries={this.state.consoleEntries}
              />
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
            <Ledger chainData={this.state.chain} />
          </div>
        </div>
        <Drive
          name={this.driveProps.name}
          userId={this.driveProps.id}
          data={this.driveProps.data}
          type={this.driveProps.type}
          toggleDrive={() => this.toggleDriveHandler(this.driveProps.id)}
          visibility={this.state.viewDrive}
          onSearch={event => this.searchDatabase(this.driveProps.id, event)}
          shareData={this.shareDataHandler}
          isDataShared={this.isDataSharedHandler}
        />
          <ToastContainer hideProgressBar />
      </div>
      
    );
  }
}

export default App;
