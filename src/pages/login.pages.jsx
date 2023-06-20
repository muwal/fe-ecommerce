import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const validEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
        );
    }
};

const Login = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                (response) => {
                    console.log(response)
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <section className='wrapper'>
            <div className='heading'>
                <h1 className="text text-large">Masuk</h1>

            </div>
            <Form className='form' onSubmit={handleLogin} ref={form}>
                <div className="input-control">
                    <label htmlFor="email" className="input-label" hidden>Email Address</label>
                    <Input type="text" name="email" id="email" className="input-field"
                        placeholder="Email" autoComplete="off" autoFocus value={email} onChange={onChangeEmail}
                        validations={[required, validEmail]} />
                </div>

                <div className="input-control">
                    <label htmlFor="password" className="input-label" hidden>Password</label>
                    <Input type="password" name="password" id="password" className="input-field"
                        placeholder="Password" value={password} onChange={onChangePassword} validations={[required]} />
                </div>
                <div className="input-control">
                    <button className='input-submit' disabled={loading} type='submit'>
                        {loading ? (<span className='spinner-border spinner-border-sm'></span>) : (<span>Masuk</span>)}
                    </button>
                </div>

                {message && (
                    <div className="input-control">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <hr></hr>
            <p className="text text-normal">Belum punya akun? <span><Link to={'/register'}
                className="text text-links">Daftar sekarang</Link></span>
            </p>
        </section>
    );
};

export default Login;