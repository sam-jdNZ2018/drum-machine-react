import React from 'react';
import Pad from './pad';

const LETTERS = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const TEXT = [
    "Heater 1",
    "Heater 2",
    "Heater 3",
    "Heater 4",
    "Clap",
    "Open HH",
    "Kick 'n Hat",
    "Kick",
    "Closed HH",
    "Chord 1",
    "Chord 2",
    "Chord 3",
    "Shaker",
    "Open HH 2",
    "Closed HH 2",
    "Punchy Kick",
    "Side Stick",
    "Snare"
];
const SOUNDS = [
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
];


class PadGroup extends React.Component {
    constructor(props) {
        super(props);
        this.playClip = this.playClip.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.makeValidText = this.makeValidText.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleInput);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleInput);
    }

    //Determine, if the machine has power, whether the input came from a button or key press and
    //pass relevant data on what clip should be played and what text to display to playClip
    handleInput(e) {
        if (this.props.power) {
            let clip;
            let text;
            let index;
            if (e.type == "click") {
                clip = document.getElementById(e.target.textContent);
                index = LETTERS.indexOf(e.target.textContent);
            } else if (e.type == "keydown") {
                clip = document.getElementById(String.fromCharCode(e.which));
                index = LETTERS.indexOf(String.fromCharCode(e.which));
            }
            if (this.props.bank == 2) {
                index = index + 9;
            }
            //If a correct key was pressed
            if(index > -1){
                text = TEXT[index];
                this.playClip(clip, text);
            }
            
        }
    }

    //Play the clip associated with the button that was pressed and
    //display that clip's description in the display <input>
    playClip(clip, text) {
        clip.load();
        clip.volume = this.props.volume / 100;
        clip.play();
        this.props.setDisplay(text);
    }

    //Convert a string from the TEXT array at the index provided into a valid jQuery selector
    makeValidText(index) {
        let s = TEXT[index];
        s = s.replace("'", "'");
        return s.replace(/\s/g, "_");
    }

    render() {
        let pads = [];
        let j = 0;
        if (this.props.bank == 2) { j = 9; }
        for (let i = 0; i < 9; i++) {
            pads.push(
                <Pad power={this.props.power}
                    desc={this.makeValidText(i + j)}
                    letter={LETTERS[i]}
                    url={SOUNDS[i + j]}
                    handler={this.handleInput}
                    onKeyDown={e => this.handleInput(e)}
                />
            );
        }

        return (
            <div id="drum-grid">
                {pads.slice(0, 3)}
                {pads.slice(3, 6)}
                {pads.slice(6, 9)}
            </div>
        );
    }
}

export default PadGroup;