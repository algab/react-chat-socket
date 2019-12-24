import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Form from './Form';
import api from '../../services/api';

import './login.css';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (data, setSubmitting) => {
        api.put('/users/login', data)
            .then(res => {
                setSubmitting(false);
                localStorage.setItem('user', JSON.stringify(res.data));
                this.props.history.push('/chat');
            })
            .catch(err => {
                if (err.response.status === 404) {
                    toast.warn('E-mail ou senha incorretos.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                } else {
                    toast.error('Por favor, tente novamente mais tarde.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                }
                setSubmitting(false);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center">
                        <div className="box">
                            <h2>Login</h2>
                            <Form submit={this.handleSubmit} />
                            <hr />
                            <Link to="/register" className="d-flex justify-content-center align-items-center mt-4">
                                Não tem uma conta ? Cadastrar-se
                            </Link>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        )
    }
}
