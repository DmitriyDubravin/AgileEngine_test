import React, { Fragment } from 'react';
import './FileZone.css';

export default ({text, selectedIndex, selectHandler, inputHandler, deselectHandler}) => {
    const inputText = text.map(({text}) => text).join(' ');
    const visualtext = text.map(({styles, text},i) => {
        let style = (i === selectedIndex) ? {background: 'yellow'} : {};
        styles.forEach(s => style = {...style, ...s});
        console.log('styles', styles);
        return (
            <Fragment key={text+i}>
                <span onClick={() => selectHandler(i)} style={style}>{text}</span>
                {' '}
            </Fragment>
        )
    });
    return (
        <div id="file-zone">
            <div id="file" onDoubleClick={() => deselectHandler()}>
                <div>{visualtext}</div>
                <hr />
                <textarea name="text" value={inputText} onChange={inputHandler}></textarea>
            </div>
        </div>
    );
}
