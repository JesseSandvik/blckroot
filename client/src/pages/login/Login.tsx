import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";

import EmailInput from "../../molecules/labeledInput/EmailInput";
import PasswordInput from "../../molecules/labeledInput/PasswordInput";
import UserCredentialPageTemplate from "../../templates/userCredentialPage/UserCredentialPageTemplate";

function LoginPage() {
  const navigate = useNavigate();
  const errorRef = useRef();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };

  const FormFooter = (): JSX.Element => {
    return (
      <>
        <p>Not a member?</p>
        <NavLink to="/signup">Create an account</NavLink>
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

export default LoginPage;
