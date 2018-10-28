import React from 'react';

export default ({synonymsList, callback}) => {
    return (
        <ul>
            {synonymsList.map((word, i) => {
                return <li key={word+i} onClick={() => callback(word)}>{word}</li>
            })}
        </ul>
    )
}