import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { createUser } from "../../api";

import "./SignUp.css";

function SignUpPage() {
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

        response?.id &&
          response?.email &&
          setUser({ id: response.id, email: response.email });
        setAuthenticated(true);
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

  return (
    <main className="SignUp">
      <div className="SignUp-header">
        <h1>
          Minimalistic time managment
          <br />
          <span className="accent-text">made simple.</span>
        </h1>
      </div>
      <form className="SignUp-form" onSubmit={handleOnSubmit}>
        <div className="input-container">
          <div className="input-container-upper">
            <label htmlFor="email">email:</label>
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
            <input
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
              ref={emailRef}
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
        <div className="input-container">
          <div className="input-container-upper">
            <label htmlFor="confirm_password">confirm password:</label>
            <div className="input-status">
              <span
                className={
                  confirmPasswordIsValid && confirmPassword ? "valid" : "hide"
                }
              >
                <i className="fa-solid fa-check"></i>
              </span>
              <span
                className={
                  confirmPasswordIsValid || !confirmPassword
                    ? "hide"
                    : "invalid"
                }
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
          <div className="input-container-lower">
            <input
              aria-describedby="confirmpasswordnote"
              aria-invalid={confirmPasswordIsValid ? "false" : "true"}
              id="confirm_password"
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
            <p
              id="confirmpasswordnote"
              className={
                confirmPasswordIsFocus && !confirmPasswordIsValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <i className="fa-solid fa-info-circle"></i>
              Must match the password from the above input field.
            </p>
          </div>
        </div>
        <div className="btn-group">
          <button
            className="form-submit-btn"
            disabled={
              !emailIsValid || !passwordIsValid || !confirmPasswordIsValid
                ? true
                : false
            }
            type="submit"
          >
            create account
          </button>
        </div>
      </form>
      <div className="SignUp-alt-login-options">
        <p>Already a member?</p>
        <NavLink to="/login">Login to your account</NavLink>
        <p>or</p>
        <NavLink to="/dashboard">Continue as guest</NavLink>
      </div>
    </main>
  );
}

export default SignUpPage;
