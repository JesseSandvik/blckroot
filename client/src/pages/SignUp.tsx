import React, { useState } from 'react';

function SignUpPage() {
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
    }
    return (
        <div className='SignUp'>
            <h1>sign up</h1>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="username">username:</label>
                <input
                    name="username"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setUsername)}
                    required
                    type="text"
                    value={username || ""}
                />
                <label htmlFor="password">password:</label>
                <input
                    name="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setPassword)}
                    required
                    type="password"
                    value={password || ""}
                />
                <label htmlFor="passwordMatch">match password:</label>
                <input
                    name="passwordMatch"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setPasswordMatch)}
                    required
                    type="password"
                    value={passwordMatch || ""}
                />
                <button type="submit">sign up</button>
            </form>
        </div>
    );
}

export default SignUpPage;
