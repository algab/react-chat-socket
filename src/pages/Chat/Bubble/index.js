import React from 'react';

import './bubble.css';

const Bubble = ({ message, user }) => {
    if (message.from === user) {
        return (
            <div className="bubble-message bubble-from">
                {message.message}
            </div>
        )
    }
    return (
        <div className="bubble-message bubble-to">
            {message.message}
        </div>
    )
}

export default Bubble;
