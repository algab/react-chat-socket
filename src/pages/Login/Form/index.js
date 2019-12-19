import React from 'react';
import { Formik } from 'formik';
import { ClipLoader } from 'react-spinners';

const Form = ({ submit }) => (
    <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
        {(props) => (
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="E-mail" onChange={props.handleChange('email')} required readOnly={props.isSubmitting} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Senha" minLength="6" onChange={props.handleChange('password')} required readOnly={props.isSubmitting} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={props.isSubmitting}>
                    {!props.isSubmitting ? 'Entrar' : (
                        <ClipLoader size={10} color={'white'} />
                    )}
                </button>
            </form>
        )}
    </Formik>
);

export default Form;
