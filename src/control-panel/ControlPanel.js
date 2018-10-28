import React from 'react';
import './ControlPanel.css';
import ColorPicker from './../ColorPricker'

export default ({cpdata, callback, setColor}) => (
    <div id="control-panel">
        <div id="format-actions">
            {cpdata.map(({name, active, ownStyle}, i) => (
                <button
                    key={name+i}
                    className={active ? 'format-action active' : 'format-action'}
                    type="button"
                    onClick={() => callback(name)}
                    >
                    <span style={ownStyle}>{name}</span>
                </button>
            ))}
            <ColorPicker setColor={setColor} />
        </div>
    </div>
);
