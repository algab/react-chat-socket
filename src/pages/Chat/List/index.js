import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import api from '../../../services/api';
import socket from '../../../services/socket';

import './list.css';

export default class List extends Component {
    state = { conversations: [], users: [], filter: [], render: 'conversation' };

    componentDidMount() {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        axios.all([
            api.get(`/conversations/users/${id}`),
            api.get('/users'),
        ]).then(res => {
            this.socketIO();
            this.setState({ conversations: res[0].data, users: res[1].data, filter: res[1].data });
        });
    }

    socketIO = () => {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        socket.on(`${id}-last-messages`, (data) => {
            this.setState({ conversations: data });
        });
    }

    handleChange = (e) => {
        const { users } = this.state;
        e.persist();
        setTimeout(() => {
            if (e.target.value !== '') {
                const filter = users.filter(data => data.name.search(new RegExp(e.target.value, 'i')) !== -1);
                this.setState({ filter, render: 'user' });
            } else {
                this.setState({ render: 'conversation' });
            }
        }, 200);
    }

    logout = () => {
        this.props.history.push('/');
        localStorage.removeItem('user');
    }

    listConversations = () => {
        const { conversations } = this.state;
        if (conversations.length === 0) {
            return (
                <div className="d-flex justify-content-center align-items-center h-100 message-alert">
                    Nenhuma Conversa
                </div>
            )
        } else {
            return conversations.map(data => (
                <div key={data._id} className="conversation-list-item justify-content-between" onClick={this.props.select(data.user[0]._id)}>
                    <div className="d-flex flex-row align-items-center">
                        <img className="conversation-photo" src={data.user[0].avatar_url} alt="avatar" />
                        <div>
                            <h1 className="conversation-title">{data.user[0].name}</h1>
                            <p className="conversation-snippet">{data.last_message.message}</p>
                        </div>
                    </div>
                    <div className="conversation-time">
                        {`${new Date(data.last_message.timestamp).getHours()}:${new Date(data.last_message.timestamp).getMinutes()}`}
                    </div>
                </div>
            ));
        }
    }

    listUsers = () => {
        const { filter } = this.state;
        return filter.map(data => (
            <div key={data._id} className="conversation-list-item" onClick={this.props.select(data._id)}>
                <img className="conversation-photo" src={data.avatar_url} alt="avatar" />
                <div>
                    <h1 className="conversation-title">{data.name}</h1>
                    <p className="conversation-snippet">{data.email}</p>
                </div>
            </div>
        ));
    }

    render() {
        const { render } = this.state;
        return (
            <div className="d-flex flex-column h-100">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h1 className="toolbar-title">Minhas Conversas</h1>
                    <button className="button-logout" onClick={this.logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                    </button>
                </div>
                <div className="d-flex flex-column conversation-search">
                    <input type="search" className="conversation-search-input"
                        placeholder="Procurar usuários"
                        onChange={this.handleChange}
                    />
                </div>
                {render === 'conversation' ? this.listConversations() : this.listUsers()}
            </div>
        )
    }
}
