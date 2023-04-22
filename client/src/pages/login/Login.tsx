import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../api";

import "./Login.css";

function LoginPage() {
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
  }, [passwordValidationTestPasses]);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

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
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid Entry");
      return;
    }
  };

  return (
    <main className="Login">
      <div className="Login-header">
        <h1>
          Minimalistic time managment
          <br />
          <span className="accent-text">made simple.</span>
        </h1>
      </div>
      <form className="Login-form" onSubmit={handleOnSubmit}>
        <div className="input-container">
          <div className="input-container-upper">
            <label htmlFor="username">username:</label>
            <div className="input-status">
              <span className={usernameIsValid ? "valid" : "hide"}>
                <i className="fa-solid fa-check"></i>
              </span>
              <span
                className={usernameIsValid || !username ? "hide" : "invalid"}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
          <div className="input-container-lower">
            <input
              aria-describedby="uidnote"
              aria-invalid={usernameIsValid ? "false" : "true"}
              autoComplete="off"
              id="username"
              name="username"
              onBlur={() => setUsernameIsFocus(false)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(event, setUsername)
              }
              onFocus={() => setUsernameIsFocus(true)}
              ref={usernameRef}
              required
              type="text"
              value={username || ""}
            />
            <p
              id="uidnote"
              className={
                usernameIsFocus && username && !usernameIsValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <i className="fa-solid fa-info-circle"></i>
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, & hyphens are allowed.
            </p>
          </div>
        </div>
        <div className="input-container">
          <div className="input-container-upper">
            <label htmlFor="password">password:</label>
            <div className="input-status">
              <span className={passwordIsValid ? "valid" : "hide"}>
                <i className="fa-solid fa-check"></i>
              </span>
              <span
                className={passwordIsValid || !password ? "hide" : "invalid"}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
          <div className="input-container-lower">
            <input
              aria-describedby="passwordnote"
              aria-invalid={passwordIsValid ? "false" : "true"}
              id="password"
              name="password"
              onBlur={() => setPasswordIsFocus(false)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(event, setPassword)
              }
              onFocus={() => setPasswordIsFocus(true)}
              required
              type="password"
              value={password || ""}
            />
            <p
              id="passwordnote"
              className={
                passwordIsFocus && !passwordIsValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <i className="fa-solid fa-info-circle"></i>
              8 to 24 characters.
              <br />
              Must include uppercase & lowercase letters, a number, & a special
              character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>
          </div>
        </div>
        <div className="btn-group">
          <button
            disabled={!usernameIsValid || !passwordIsValid ? true : false}
            type="submit"
          >
            continue
          </button>
        </div>
      </form>
      <div className="Login-alt-login-options">
        <p>Not a member?</p>
        <NavLink to="/signup">Create an account</NavLink>
        <p>or</p>
        <NavLink to="/dashboard">Continue as guest</NavLink>
      </div>
    </main>
  );
}

export default LoginPage;
