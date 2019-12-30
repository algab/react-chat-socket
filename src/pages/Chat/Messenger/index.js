import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './messenger.css';

export default class Messenger extends Component {
    state = { inputChanged: false };

    onChange = (e) => {
        if (e.target.value === '') {
            this.setState({ inputChanged: false });
        } else {
            this.setState({ inputChanged: true });
        }
    }

    render() {
        const { inputChanged } = this.state;
        return (
            <Fragment>
                <div className="d-flex flex-row align-items-center sticky-top p-2 top">
                    <img className="conversation-photo" src="https://avatars0.githubusercontent.com/u/30054466?s=460&v=4" alt="avatar" />
                    <h1 className="name-user">Álvaro Oliveira</h1>
                </div>
                {Array.from({ length: 50 }).map((_, index) => (
                    <div key={index}>
                        Teste {index}
                    </div>
                ))}
                <div className="bottom-input">
                    <input type="text"
                        className="w-100 write-input"
                        placeholder="Escreva sua mensagem aqui"
                        onChange={this.onChange}
                    />
                    {inputChanged && (
                        <button className="button-icon">
                            <FontAwesomeIcon icon={faPaperPlane} size="1x" color="blue" />
                        </button>
                    )}
                </div>
            </Fragment>
        )
    }
};
