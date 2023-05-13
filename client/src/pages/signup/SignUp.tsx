import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../api";

import PasswordConfirmInput from "../../molecules/passwordConfirmInput/PasswordConfirmInput";
import EmailInput from "../../molecules/emailInput/EmailInput";
import PasswordInput from "../../molecules/passwordInput/PasswordInput";
import UserFormPageTemplate from "../../templates/forms/UserFormPage";

import "./SignUp.css";

function SignUpPage() {
  const navigate = useNavigate();
  const errorRef = useRef();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

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
        firstInput={<EmailInput email={email} setEmail={setEmail} />}
        secondInput={
          <PasswordInput password={password} setPassword={setPassword} />
        }
        thirdInput={
          <PasswordConfirmInput
            confirmPassword={confirmPassword}
            password={password}
            setConfirmPassword={setConfirmPassword}
          />
        }
        formFooter={<FormFooter />}
        pageClassName="Signup"
        pageHeading="minimalistic time management made simple"
        onFormSubmit={handleOnSubmit}
        submitButtonName="create account"
        submitButtonDisabled={false}
      />
    </>
  );
}

export default SignUpPage;
