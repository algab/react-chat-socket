import React from 'react';

import List from './List';
import Messenger from './Messenger';

import './chat.css';

const Chat = () => (
    <div className="container-fluid h-100">
        <div className="row h-100">
            <div className="col-4 h-100 scroll">
                <List />
            </div>
            <div className="col-8 p-0 h-100 scroll">
                <Messenger />
                {/*<div className="d-flex justify-content-center align-items-center h-100 message-alert">
                    Selecione uma conversa
                </div>*/}
            </div>
        </div>
    </div>
);

export default Chat;