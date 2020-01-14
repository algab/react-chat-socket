import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Bubble from '../Bubble';

import api from '../../../services/api';
import socket from '../../../services/socket';

import './messenger.css';

export default class Messenger extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = { inputChanged: false, user: undefined, conversation: '', messages: [] };
    }

    componentDidMount() {
        const { toUser } = this.props;
        const id = JSON.parse(localStorage.getItem('user'))._id;
        api.get(`/users/${toUser}`)
            .then(resp => {
                this.setState({ user: resp.data });
                return api.get(`/conversations/users/${id}?user=${toUser}`);
            })
            .then(resp => {
                if (resp.data.length !== 0) {
                    this.setState({ conversation: resp.data[0]._id });
                    api.get(`/conversations/${resp.data[0]._id}`)
                        .then(resp => {
                            this.setState({ messages: resp.data.messages });
                            this.socketIO(this.state.conversation);
                            document.querySelector('#space-scroll').scrollIntoView(false);
                        });
                }
            });
    }

    componentDidUpdate(prevProps, _) {
        const { toUser } = this.props;
        if (toUser !== prevProps.toUser) {
            this.setState({ messages: [] });
            this.textInput.current.value = '';
            const id = JSON.parse(localStorage.getItem('user'))._id;
            api.get(`/users/${toUser}`)
                .then(resp => {
                    this.setState({ user: resp.data });
                    return api.get(`/conversations/users/${id}?user=${toUser}`);
                })
                .then(resp => {
                    if (resp.data.length !== 0) {
                        this.setState({ conversation: resp.data[0]._id });
                        api.get(`/conversations/${resp.data[0]._id}`)
                            .then(resp => {
                                this.setState({ messages: resp.data.messages });
                                this.socketIO(this.state.conversation);
                                document.querySelector('#space-scroll').scrollIntoView(false);
                            });
                    }
                });
        }
    }

    socketIO = (id) => {
        const { messages } = this.state;
        socket.on(id, (data) => {
            this.setState({ messages: messages.concat(data) });
        });
    }

    onChange = (e) => {
        if (e.target.value === '') {
            this.setState({ inputChanged: false });
        } else {
            this.setState({ inputChanged: true });
        }
    }

    sendMessage = async () => {
        const { conversation, messages } = this.state;
        const { toUser } = this.props;
        const id = JSON.parse(localStorage.getItem('user'))._id;
        const message = {
            message: this.textInput.current.value,
            from: id,
            to: toUser,
            timestamp: new Date().getTime()
        };
        if (conversation === '') {
            const result = await api.post('/conversations', { users: [id, toUser] });
            await api.put(`/conversations/${result.data.data._id}/message`, message);
            this.socketIO(result.data.data._id);
            this.setState({ conversation: result.data.data._id });
        } else {
            await api.put(`/conversations/${conversation}/message`, message);
        }
        socket.emit('message', { message, conversation });
        this.textInput.current.value = '';
        this.setState({ messages: messages.concat(message), inputChanged: false });
        document.querySelector('#space-scroll').scrollIntoView(false);
    }

    render() {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        const { inputChanged, user, messages } = this.state;
        return (
            <Fragment>
                {
                    user !== undefined && (
                        <div className="d-flex flex-row align-items-center sticky-top p-2 top">
                            <img className="conversation-photo" src={user.avatar_url} alt="avatar" />
                            <h1 className="name-user">{user.name}</h1>
                        </div>
                    )
                }
                <div className="bubble-container">
                    {messages.map((data, index) => (
                        <Bubble message={data} user={id} key={index} />
                    ))}
                    <div id="space-scroll" style={{ height: '65px' }} />
                </div>
                <div className="bottom-input">
                    <input type="text"
                        className="w-100 write-input"
                        placeholder="Escreva sua mensagem aqui"
                        onChange={this.onChange}
                        ref={this.textInput}
                    />
                    {inputChanged && (
                        <button className="button-icon" onClick={this.sendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} size="1x" color="blue" />
                        </button>
                    )}
                </div>
            </Fragment>
        )
    }
};
