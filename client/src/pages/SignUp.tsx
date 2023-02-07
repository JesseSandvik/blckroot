import React, { useState } from 'react';

function SignUpPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordMatch, setPasswordMatch] = useState<string>();
    return (
        <div className='SignUp'>
            <h1>sign up</h1>
            <form>
                <label htmlFor="username">username:</label>
                <input
                    name="username"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)}
                    required
                    type="text"
                    value={username || ""}
                />
                <label htmlFor="password">password:</label>
                <input
                    name="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)}
                    required
                    type="text"
                    value={password || ""}
                />
                <label htmlFor="passwordMatch">match password:</label>
                <input
                    name="passwordMatch"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)}
                    required
                    type="text"
                    value={passwordMatch || ""}
                />
            </form>
        </div>
    );
}

export default SignUpPage;
