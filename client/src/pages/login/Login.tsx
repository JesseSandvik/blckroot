import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";
import { AuthContext } from "../../context/auth/AuthContext";
import { loginUser } from "../../api";

import "./Login.css";

function LoginPage() {
  const { authenticated, setAuthenticated, setUser } = useContext(AuthContext);
  const EMAIL_REGEX = useMemo(() => /^\S+@\S+\.\S+$/, []);
  const PASSWORD_REGEX = useMemo(
    () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    []
  );

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef();

  const [email, setEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [emailIsFocus, setEmailIsFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const emailValidationTestPasses = EMAIL_REGEX.test(email);
  const passwordValidationTestPasses = PASSWORD_REGEX.test(password);

  useEffect(() => {
    emailRef?.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    setEmailIsValid(emailValidationTestPasses);
  }, [emailValidationTestPasses]);

  useEffect(() => {
    setPasswordIsValid(passwordValidationTestPasses);
  }, [passwordValidationTestPasses]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    event.preventDefault();
    setState(event.currentTarget.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailValidationTestPasses && passwordValidationTestPasses) {
      const { signal } = new AbortController();

      try {
        const response = await loginUser(
          {
            email,
            password,
          },
          signal
        );
        console.log({ response });

        response?.id &&
          response?.email &&
          setUser({ id: response.id, email: response.email });
        setAuthenticated(true);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } catch (error) {
        console.log({ error });
      }
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
            <Label htmlFor="email">email:</Label>
            <div className="input-status">
              <span className={emailIsValid ? "valid" : "hide"}>
                <i className="fa-solid fa-check"></i>
              </span>
              <span className={emailIsValid || !email ? "hide" : "invalid"}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
          <div className="input-container-lower">
            <Input
              aria-describedby="emailnote"
              aria-invalid={emailIsValid ? "false" : "true"}
              autoComplete="off"
              id="email"
              name="email"
              onBlur={() => setEmailIsFocus(false)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(event, setEmail)
              }
              onFocus={() => setEmailIsFocus(true)}
              inputRef={emailRef}
              required
              type="email"
              value={email || ""}
            />
            <p
              id="emailnote"
              className={
                emailIsFocus && email && !emailIsValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <i className="fa-solid fa-info-circle"></i>
              Please enter an email address with a valid format.
            </p>
          </div>
        </div>
        <div className="input-container">
          <div className="input-container-upper">
            <Label htmlFor="password">password:</Label>
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
            <Input
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
        <div className="support-container">
          <NavLink to="/forgot_password">Forgot password?</NavLink>
        </div>
        <div className="btn-group">
          <Button
            disabled={!emailIsValid || !passwordIsValid ? true : false}
            type="submit"
          >
            continue
          </Button>
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
