import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUser } from '../../api';

import "./SignUp.css";

function SignUpPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        event.preventDefault();
        setState(event.currentTarget.value);
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { signal } = new AbortController();
        const response = createUser({
            username,
            password,
            confirmPassword,
        }, signal);
        console.log(response);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    }
    return (
        <main className='SignUp'>
            <div className='SignUp-header'>
                <h1>Minimalistic time managment<br /><span className='accent-text'>made simple</span></h1>
            </div>
            <form className='SignUp-form' onSubmit={handleOnSubmit}>
                <div className='input-container'>
                    <label htmlFor="username">username:</label>
                    <input
                        id="username"
                        name="username"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setUsername)}
                        required
                        type="text"
                        value={username || ""}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">password:</label>
                    <input
                        id="password"
                        name="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setPassword)}
                        required
                        type="password"
                        value={password || ""}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="confirmPassword">confirm password:</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setConfirmPassword)}
                        required
                        type="password"
                        value={confirmPassword || ""}
                    />
                </div>
                <div className='btn-group'>
                    <button type="submit">create account</button>
                </div>
            </form>
            <div className='SignUp-alt-login-options'>
                <p>Already a member?</p>
                <NavLink to="/">Login to your account</NavLink>
                <p>or</p>
                <NavLink to="/">Continue as guest</NavLink>
            </div>
        </main>
    );
}

export default SignUpPage;
