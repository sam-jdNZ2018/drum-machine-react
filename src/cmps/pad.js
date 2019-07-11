import React from 'react';

const Pad = props => {
    return (
        <button
            className="drum-pad"
            id={props.desc}
            type="button"
            onClick={e => props.handler(e)} disabled={!props.power}
        >
            {props.letter}
            <audio className="clip" id={props.letter} src={props.url} />
        </button>
    );
};

export default Pad;