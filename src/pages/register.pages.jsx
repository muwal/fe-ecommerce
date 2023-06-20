import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [validationPassword, setValidationPassword] = useState('');

    const onChangeFirstName = (e) => {
        const first_name = e.target.value;
        setFirstName(first_name);
    };

    const onChangeLastName = (e) => {
        const last_name = e.target.value;
        setLastName(last_name);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeConfirmPassword = (e) => {
        const password_confirmation = e.target.value;
        setConfirmPassword(password_confirmation);

        if (password && password_confirmation !== password) {
            setValidationPassword(<div className="invalid-feedback d-block">
                Password doesn't match.
            </div>);
        } else {
            setValidationPassword('')
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (password && password_confirmation !== password) {
            setValidationPassword(<div className="invalid-feedback d-block">
                Password doesn't match.
            </div>);
        } else {
            setValidationPassword('')

            setMessage("");
            setSuccessful(false);

            form.current.validateAll();

            if (checkBtn.current.context._errors.length === 0) {
                AuthService.register(first_name, last_name, email, phone, password, password_confirmation).then(
                    (response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        setTimeout(() => navigate('/login'), 5000);
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                );
            }
        }
    };

    return (
        <section className='wrapper'>
            <div className='heading'>
                <h1 className="text text-large">Daftar Sekarang</h1>

            </div>
            <Form className='form' onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <>
                        <div className="input-control">
                            <label htmlFor="first_name" className="input-label" hidden>Nama Depan</label>
                            <Input type="text" name="first_name" id="first_name" className="input-field"
                                placeholder="Nama Depan" onChange={onChangeFirstName} value={first_name} validations={[required]} autoFocus />
                            {/* @if ($errors->has('name'))
                        <span className="text-danger text-left">{{ $errors-> first('name')}}</span>
                        @endif */}
                        </div>

                        <div className="input-control">
                            <label htmlFor="last_name" className="input-label" hidden>Nama Belakang</label>
                            <Input type="text" name="last_name" id="last_name" className="input-field"
                                placeholder="Nama Belakang" onChange={onChangeLastName} value={last_name} />
                            {/* @if ($errors->has('name'))
                        <span className="text-danger text-left">{{ $errors-> first('name')}}</span>
                        @endif */}
                        </div>

                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email Address</label>
                            <Input type="text" name="email" id="email" className="input-field"
                                placeholder="email@example.com" onChange={onChangeEmail} value={email} validations={[required, validEmail]} />
                            {/* @if ($errors->has('email'))
                        <span className="text-danger text-left">{{ $errors-> first('email')}}</span>
                        @endif */}
                        </div>

                        <div className="input-control">
                            <label htmlFor="phone" className="input-label" hidden>Phone Number</label>
                            <Input type="number" name="phone" id="phone" className="input-field"
                                placeholder="Nomor Telepon" onChange={onChangePhone} value={phone} validations={[required]} min='0' minLength='9' />
                            {/* @if ($errors->has('phone'))
                        <span className="text-danger text-left">{{ $errors-> first('phone')}}</span>
                        @endif */}
                        </div>

                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Password</label>
                            <Input type="password" name="password" id="password" className="input-field"
                                placeholder="Password" onChange={onChangePassword} value={password} validations={[required]} autoComplete="new-password" />
                            {/* @if ($errors->has('password'))
                        <span className="text-danger text-left">{{ $errors-> first('password')}}</span>
                        @endif */}
                        </div>

                        <div className="input-control">
                            <label htmlFor="password_confirmation" className="input-label" hidden>Confirm Password</label>
                            <Input type="password" name="password_confirmation" id="password_confirmation"
                                className="input-field" placeholder="Konfirmasi Password" onChange={onChangeConfirmPassword} value={password_confirmation} validations={[required]} autoComplete="new-password" />
                            {validationPassword}
                            {/* @if ($errors->has('password_confirmation'))
                        <span className="text-danger text-left">{{ $errors-> first('password_confirmation')}}</span>
                        @endif */}
                        </div>
                        <div className="input-control">
                            <button className='input-submit' type='submit'>
                                <span>Masuk</span>
                            </button>
                        </div>
                    </>
                )}

                {message && (
                    <div className="input-control">
                        <div className={successful ? "alert alert-success" : "alert alert-danger"
                        } role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <hr></hr>
            <p className="text text-normal">Sudah punya akun? <span><Link to={'/login'}
                className="text text-links">Masuk</Link></span>
            </p>
        </section>
    );
};

export default Register;