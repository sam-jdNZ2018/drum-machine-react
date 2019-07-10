import React from 'react';
import PadGroup from "./pad-group";

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { power: true, bank: 1, volume: 50 };
    this.volChange = this.volChange.bind(this);
    this.bankChange = this.bankChange.bind(this);
    this.powerChange = this.powerChange.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
  }

  //Change the volume to the current setting of the volume slider
  volChange(e) {
    this.setState({
      power: this.state.power,
      bank: this.state.bank,
      volume: e.target.value
    });
    document.getElementById("vol-display").innerHTML =
      "Volume: " + e.target.value;
  }

  //Change the bank to the opposite setting of what it currently is. This changes the sound clips to the alternate set
  bankChange(id) {
    if (id == "bank1" && this.state.bank == 2) {
      this.setState({
        power: this.state.power,
        bank: 1,
        volume: this.state.volume
      });
      this.setDisplay("");
    }
    else if (id == "bank2" && this.state.bank == 1) {
      this.setState({
        power: this.state.power,
        bank: 2,
        volume: this.state.volume
      });
    }

  }

  //Either turns the pads on or off, depending on their current state
  powerChange() {
    this.setState({
      power: !this.state.power,
      bank: this.state.bank,
      volume: this.state.volume
    });
    this.setDisplay("");
  }

  //Set the text displayed by the display <input> text element 
  setDisplay(text) {
    document.getElementById("display").innerHTML = text;
  }

  render() {
    let bank1Col = { backgroundColor: "white" };
    let bank2Col = { backgroundColor: "white" };
    let powerCol = { color: "red" };
    if (this.state.power) {
      powerCol = { color: "green" };
      if (this.state.bank == 1) {
        bank1Col = { backgroundColor: "green" };
      }
      else {
        bank2Col = { backgroundColor: "green" };
      }
    }
    return (
      <div id="drum-machine">
        <h1>Drum Machine 2019</h1>
        <div id="drum-cont">
          <PadGroup power={this.state.power} bank={this.state.bank} volume={this.state.volume} setDisplay={this.setDisplay} />
        </div>
        <div id="controls">
          <div id="settings">
            <div id="power-cont">
              <h2 id="power-title">Power</h2>
              <div id="power-toggle">
                <button id="power" style={powerCol} onClick={this.powerChange}>
                  <i className="fas fa-power-off" />
                </button>
              </div>
            </div>
            <div id="bank-cont">
              <h2 id="bank-title">Bank</h2>
              <div id="bank-toggle">
                <button id="bank1" style={bank1Col} onClick={e => this.bankChange(e.target.id)} disabled={!this.state.power}>A</button>
                <button id="bank2" style={bank2Col} onClick={e => this.bankChange(e.target.id)} disabled={!this.state.power}>B</button>
              </div>
            </div>
            <h2 id="vol-display">Volume: {this.state.volume}</h2>
            <input id="vol-slider" type="range" min="0" max="100" step="1" defaultValue={this.state.volume} onInput={this.volChange} disabled={!this.state.power} />
          </div>
          <p id="display"></p>
        </div>
      </div>
    );
  }
}

export default DrumMachine;
