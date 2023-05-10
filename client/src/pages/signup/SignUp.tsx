import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../../atoms/icon/Icon";
import LabeledInput from "../../molecules/labeledInput/LabeledInput";
import UserFormTemplate from "../../templates/forms/UserForm";
import { createUser } from "../../api";

import "./SignUp.css";

function SignUpPage() {
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

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(false);
  const [confirmPasswordIsFocus, setConfirmPasswordIsFocus] =
    useState<boolean>(false);

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
    const passwordIsConfirmed = password === confirmPassword;
    setConfirmPasswordIsValid(passwordIsConfirmed);
  }, [password, passwordValidationTestPasses, confirmPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

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
        const response = await createUser(
          {
            email,
            password,
          },
          signal
        );
        console.log({ response });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/dashboard");
      } catch (error) {
        console.log({ error });
      }
    } else {
      setErrorMessage("Invalid Entry");
      return;
    }
  };

  const EmailInput = (): JSX.Element => {
    return (
      <>
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
      </>
    );
  };

  const PasswordInput = (): JSX.Element => {
    return (
      <>
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
        <p
          id="passwordnote"
          className={
            passwordIsFocus && !passwordIsValid ? "instructions" : "offscreen"
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
      </>
    );
  };

  const PasswordConfirmInput = (): JSX.Element => {
    return (
      <>
        <LabeledInput
          aria-describedby="confirmpasswordnote"
          aria-invalid={confirmPasswordIsValid ? "false" : "true"}
          className="input-user-credentials"
          inputId="confirm_password"
          label="confirm password:"
          name="confirm_password"
          onBlur={() => setConfirmPasswordIsFocus(false)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(event, setConfirmPassword)
          }
          onFocus={() => setConfirmPasswordIsFocus(true)}
          required
          type="password"
          value={confirmPassword || ""}
        />
        <div className="input-status">
          <Icon
            className={
              confirmPasswordIsValid && confirmPassword ? "success" : "hide"
            }
            type="checkmark"
          />
          <Icon
            className={
              confirmPasswordIsValid || !confirmPassword ? "hide" : "alert"
            }
            type="x-mark"
          />
        </div>
        <p
          id="confirmpasswordnote"
          className={
            confirmPasswordIsFocus && !confirmPasswordIsValid
              ? "instructions"
              : "offscreen"
          }
        >
          <Icon type="info" />
          Must match the password from the above input field.
        </p>
      </>
    );
  };

  return (
    <>
      <UserFormTemplate
        firstInput={<EmailInput />}
        secondInput={<PasswordInput />}
        thirdInput={<PasswordConfirmInput />}
        pageClassName="Signup"
        pageHeading="minimalistic time management made simple"
        onFormSubmit={handleOnSubmit}
        submitButtonName="create account"
        submitButtonDisabled={
          !emailIsValid || !passwordIsValid || !confirmPasswordIsValid
            ? true
            : false
        }
      />
      <div className="SignUp-alt-login-options">
        <p>Already a member?</p>
        <NavLink to="/login">Login to your account</NavLink>
        <p>or</p>
        <NavLink to="/dashboard">Continue as guest</NavLink>
      </div>
    </>
  );
}

export default SignUpPage;
