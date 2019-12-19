import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Form from './Form';
import api from '../../services/api';

import './register.css';
import 'react-toastify/dist/ReactToastify.css';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { formError: false };
    }

    handleSubmit = (data, setSubmitting) => {
        api.post('/users', data)
            .then(data => {
                setSubmitting(false);
                localStorage.setItem('user', JSON.stringify(data));
                this.props.history.push('/chat');
            })
            .catch(err => {
                if (err.response.status === 409) {
                    toast.warn('E-mail não disponível.', {
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

    validate = (values) => {
        const errors = {};
        if (values.confirm !== '' && values.confirm !== values.password) {
            errors.confirm = 'Repita a mesma senha digitada anteriormente.';
            this.setState({ formError: true });
        }
        return errors;
    }

    render() {
        const { formError } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 center-register">
                        <div className="box-register">
                            <h2>Cadastrar-se</h2>
                            <Form validate={this.validate} submit={this.handleSubmit} />
                            <hr />
                            <Link to="/" className={`d-flex justify-content-center align-items-center ${formError ? 'mt-2' : 'mt-4'}`}>
                                Já tem uma conta ? Faça o Login
                            </Link>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        )
    }
}
