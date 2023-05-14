import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../api";

import EmailInput from "../../molecules/emailInput/EmailInput";
import PasswordConfirmInput from "../../molecules/passwordConfirmInput/PasswordConfirmInput";
import PasswordInput from "../../molecules/passwordInput/PasswordInput";
import UserFormPageTemplate from "../../templates/forms/UserFormPage";

function SignUpPage() {
  const navigate = useNavigate();
  const errorRef = useRef();

  const [email, setEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  useEffect(() => {
    setConfirmPasswordIsValid(confirmPassword === password);
  }, [confirmPassword, password]);

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

  const FormFooter = (): JSX.Element => {
    return (
      <>
        <p>Already a member?</p>
        <NavLink to="/login">Login to your account</NavLink>
        <p>or</p>
        <NavLink to="/dashboard">Continue as guest</NavLink>
      </>
    );
  };

  return (
    <>
      <UserFormPageTemplate
        firstInput={
          <EmailInput
            email={email}
            emailIsValid={emailIsValid}
            setEmail={setEmail}
            setEmailIsValid={setEmailIsValid}
          />
        }
        secondInput={
          <PasswordInput
            password={password}
            passwordIsValid={passwordIsValid}
            setPassword={setPassword}
            setPasswordIsValid={setPasswordIsValid}
          />
        }
        thirdInput={
          <PasswordConfirmInput
            confirmPassword={confirmPassword}
            confirmPasswordIsValid={confirmPasswordIsValid}
            password={password}
            setConfirmPassword={setConfirmPassword}
            setConfirmPasswordIsValid={setConfirmPasswordIsValid}
          />
        }
        formFooter={<FormFooter />}
        pageHeading="minimalistic time management made simple"
        onFormSubmit={handleOnSubmit}
        submitButtonName="create account"
        submitButtonDisabled={
          emailIsValid && passwordIsValid && confirmPasswordIsValid
            ? false
            : true
        }
      />
    </>
  );
}

export default SignUpPage;
