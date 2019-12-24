import React from 'react';
import { Formik } from 'formik';
import { ClipLoader } from 'react-spinners';

const Form = ({ submit, validate }) => (
    <Formik
        initialValues={{ name: '', email: '', password: '', confirm: '' }}
        validate={values => validate(values)}
        onSubmit={(values, { setSubmitting }) => submit(values, setSubmitting)}
    >
        {(props) => (
            <form className="mb-4" onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Nome" onChange={props.handleChange('name')} required readOnly={props.isSubmitting} />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="E-mail" onChange={props.handleChange('email')} required readOnly={props.isSubmitting} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Senha" minLength="6" onChange={props.handleChange('password')} required readOnly={props.isSubmitting} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirmar Senha" minLength="6" onChange={props.handleChange('confirm')} required readOnly={props.isSubmitting} />
                    {props.errors.confirm && (
                        <p className="small text-center text-danger mt-1 mb-0">{props.errors.confirm}</p>
                    )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={props.isSubmitting}>
                    {!props.isSubmitting ? 'Salvar' : (
                        <ClipLoader size={10} color={'white'} />
                    )}
                </button>
            </form>
        )}
    </Formik>
);

export default Form;
