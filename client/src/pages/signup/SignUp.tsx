import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        console.log(`USERNAME:  ${username}`);
        console.log(`PASSWORD:  ${password}`);
        console.log(`PASSWORD MATCH:  ${confirmPassword}`);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate("/dashboard");
    }
    return (
        <main className='SignUp'>
            <div className='SignUp-header'>
                <h1>Minimalistic time managment<br/><span className='accent-text'>made simple</span>.</h1>
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
                <button type="submit">create account</button>
            </form>
        </main>
    );
}

export default SignUpPage;
