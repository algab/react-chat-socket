import React, { Component } from 'react';

import List from './List';
import Messenger from './Messenger';

import './chat.css';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { toUser: undefined };
    }

    select = (toUser) => () => {
        this.setState({ toUser });
    };

    render() {
        const { toUser } = this.state;
        return (
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-4 h-100 scroll">
                        <List select={this.select} history={this.props.history} />
                    </div>
                    <div className="col-8 p-0 h-100 scroll">
                        {toUser === undefined ?
                            (
                                <div className="d-flex justify-content-center align-items-center h-100 message-alert">
                                    Selecione uma conversa
                                </div>
                            ) : <Messenger toUser={toUser} />
                        }
                    </div>
                </div>
            </div>
        )
    }
};
