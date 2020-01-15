import React from 'react';
import { format } from 'date-fns';

import './bubble.css';

const Bubble = ({ message, length, index, user }) => {
    if (message.from === user) {
        return (
            <div className={"bubble-message bubble-from" + (length === index + 1 ? " last-bubble" : "")}>
                <span>{message.message}</span>
                <span className="timestamp timestamp-from">{format(message.timestamp, 'HH:mm')}</span>
            </div>
        )
    }
    return (
        <div className={"bubble-message bubble-to" + (length === index + 1 ? " last-bubble" : "")}>
            <span>{message.message}</span>
            <span className="timestamp timestamp-to">{format(message.timestamp, 'HH:mm')}</span>
        </div>
    )
};

export default Bubble;
