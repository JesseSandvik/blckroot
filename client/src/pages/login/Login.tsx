import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../atoms/button/Button";
import Form from "../../organisms/form/Form";
import Heading from "../../atoms/heading/Heading";
import Icon from "../../atoms/icon/Icon";
import LabeledInput from "../../molecules/labeledInput/LabeledInput";
import { loginUser } from "../../api";

import "./Login.css";

function LoginPage() {
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
        <Heading tag="1">
          minimalistic time managment
          <br />
          <span className="accent-text">made simple.</span>
        </Heading>
      </div>
      <Form className="Login-form" onSubmit={handleOnSubmit}>
        <div className="input-container">
          <LabeledInput
            aria-describedby="emailnote"
            aria-invalid={emailIsValid ? "false" : "true"}
            autoComplete="off"
            className="input-user-credentials"
            inputId="email"
            label="email:"
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
          <div className="input-status">
            <Icon
              className={emailIsValid ? "success" : "hide"}
              type="checkmark"
            />
            <Icon
              className={emailIsValid || !email ? "hide" : "alert"}
              type="x-mark"
            />
          </div>
          <div className="input-container-lower">
            <p
              id="emailnote"
              className={
                emailIsFocus && email && !emailIsValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <Icon type="info" />
              Please enter an email address with a valid format.
            </p>
          </div>
        </div>
        <div className="input-container">
          <LabeledInput
            aria-describedby="passwordnote"
            aria-invalid={passwordIsValid ? "false" : "true"}
            className="input-user-credentials"
            inputId="password"
            label="password:"
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
          <div className="input-status">
            <Icon
              className={passwordIsValid ? "success" : "hide"}
              type="checkmark"
            />
            <Icon
              className={passwordIsValid || !password ? "hide" : "alert"}
              type="x-mark"
            />
          </div>
          <div className="input-container-lower">
            <p
              id="passwordnote"
              className={
                passwordIsFocus && !passwordIsValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <Icon type="info" />
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
      </Form>
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
