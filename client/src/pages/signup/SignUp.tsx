import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./SignUp.css";

function SignUpPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        event.preventDefault();
        setState(event.currentTarget.value);
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`USERNAME:  ${username}`);
        console.log(`PASSWORD:  ${password}`);
        console.log(`PASSWORD MATCH:  ${passwordMatch}`);
        setUsername("");
        setPassword("");
        setPasswordMatch("");
        navigate("/dashboard");
    }
    return (
        <main className='SignUp'>
            <div className='SignUp-header'>
                <h1>Minimalistic time managment<br/><span className='accent-text'>made simple</span>.</h1>
            </div>
            <form className='SignUp-form' onSubmit={handleOnSubmit}>
                <label htmlFor="username">username:</label>
                <input
                    id="username"
                    name="username"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setUsername)}
                    required
                    type="text"
                    value={username || ""}
                />
                <label htmlFor="password">password:</label>
                <input
                    id="password"
                    name="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setPassword)}
                    required
                    type="password"
                    value={password || ""}
                />
                <label htmlFor="passwordMatch">password match:</label>
                <input
                    id="passwordMatch"
                    name="passwordMatch"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setPasswordMatch)}
                    required
                    type="password"
                    value={passwordMatch || ""}
                />
                <button type="submit">create account</button>
            </form>
        </main>
    );
}

export default SignUpPage;
