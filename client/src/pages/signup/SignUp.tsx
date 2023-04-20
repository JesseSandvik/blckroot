import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../api";

import "./SignUp.css";

function SignUpPage() {
  const USERNAME_REGEX = useMemo(() => /^[a-zA-Z][a-zA-Z0-9-_]{6,23}$/, []);
  const PASSWORD_REGEX = useMemo(
    () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    []
  );

  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef();

  const [username, setUsername] = useState<string>("");
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const [usernameIsFocus, setUsernameIsFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(false);
  const [confirmPasswordIsFocus, setConfirmPasswordIsFocus] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const usernameValidationTestPasses = USERNAME_REGEX.test(username);
  const passwordValidationTestPasses = PASSWORD_REGEX.test(password);

  useEffect(() => {
    usernameRef?.current && usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setUsernameIsValid(usernameValidationTestPasses);
  }, [usernameValidationTestPasses]);

  useEffect(() => {
    setPasswordIsValid(passwordValidationTestPasses);
    const passwordIsConfirmed = password === confirmPassword;
    setConfirmPasswordIsValid(passwordIsConfirmed);
  }, [password, passwordValidationTestPasses, confirmPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password, confirmPassword]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    event.preventDefault();
    setState(event.currentTarget.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usernameValidationTestPasses && passwordValidationTestPasses) {
      const { signal } = new AbortController();
      const response = await createUser(
        {
          username,
          password,
        },
        signal
      );
      console.log(response);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid Entry");
      return;
    }
  };

  return (
    <main className="SignUp">
      <div className="SignUp-header">
        <h1>
          Minimalistic time managment
          <br />
          <span className="accent-text">made simple</span>
        </h1>
      </div>
      <form className="SignUp-form" onSubmit={handleOnSubmit}>
        <div className="input-container">
          <label htmlFor="username">username:</label>
          <input
            id="username"
            name="username"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event, setUsername)
            }
            required
            type="text"
            value={username || ""}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">password:</label>
          <input
            id="password"
            name="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event, setPassword)
            }
            required
            type="password"
            value={password || ""}
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword">confirm password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event, setConfirmPassword)
            }
            required
            type="password"
            value={confirmPassword || ""}
          />
        </div>
        <div className="btn-group">
          <button type="submit">create account</button>
        </div>
      </form>
      <div className="SignUp-alt-login-options">
        <p>Already a member?</p>
        <NavLink to="/">Login to your account</NavLink>
        <p>or</p>
        <NavLink to="/dashboard">Continue as guest</NavLink>
      </div>
    </main>
  );
}

export default SignUpPage;
