import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../api";

import EmailInput from "../../molecules/labeledInput/EmailInput";
import PasswordConfirmInput from "../../molecules/labeledInput/PasswordConfirmInput";
import PasswordInput from "../../molecules/labeledInput/PasswordInput";
import UserCredentialPageTemplate from "../../templates/userCredentialPage/UserCredentialPageTemplate";

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
      <UserCredentialPageTemplate
        email={email}
        onSubmit={handleOnSubmit}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </>
  );
}

export default SignUpPage;
