import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import EmailInput from "../../molecules/emailInput/EmailInput";
import PasswordInput from "../../molecules/passwordInput/PasswordInput";
import Icon from "../../atoms/icon/Icon";
import LabeledInput from "../../molecules/labeledInput/LabeledInput";
import UserFormTemplate from "../../templates/forms/UserForm";
import { createUser } from "../../api";

import "./SignUp.css";

function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const errorRef = useRef();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(false);
  const [confirmPasswordIsFocus, setConfirmPasswordIsFocus] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    event.preventDefault();
    setState(event.currentTarget.value);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        firstInput={
          <EmailInput
            email={email}
            handleOnChange={handleOnChange}
            setEmail={setEmail}
          />
        }
        secondInput={
          <PasswordInput
            handleOnChange={handleOnChange}
            password={password}
            setPassword={setPassword}
          />
        }
        thirdInput={<PasswordConfirmInput />}
        pageClassName="Signup"
        pageHeading="minimalistic time management made simple"
        onFormSubmit={handleOnSubmit}
        submitButtonName="create account"
        submitButtonDisabled={false}
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
