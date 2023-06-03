import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import Button from "../../atoms/button/Button";
import EmailInput from "../../molecules/labeledInput/EmailInput";
import Form from "./Form";
import InfoTooltip from "../../molecules/infoTooltip/InfoTooltip";
import PasswordConfirmInput from "../../molecules/labeledInput/PasswordConfirmInput";
import PasswordInput from "../../molecules/labeledInput/PasswordInput";

type UserCredentialFormTypes = {
  confirmPassword?: string;
  email: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  password: string;
  setConfirmPassword?: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

const UserCredentialForm = ({
  confirmPassword,
  email,
  onSubmit,
  password,
  setConfirmPassword,
  setEmail,
  setPassword,
}: UserCredentialFormTypes): JSX.Element => {
  const EMAIL_REGEX = useMemo(() => /^\S+@\S+\.\S+$/, []);
  const emailValidationTestPasses = EMAIL_REGEX.test(email);
  const emailRef = useRef<HTMLInputElement>(null);

  const PASSWORD_REGEX = useMemo(
    () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    []
  );
  const passwordValidationTestPasses = PASSWORD_REGEX.test(password);

  const location = useLocation();
  const [buttonName, setButtonName] = useState<string>("");

  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [emailIsFocus, setEmailIsFocus] = useState<boolean>(false);

  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState<boolean>(false);

  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(false);
  const [confirmPasswordIsFocus, setConfirmPasswordIsFocus] =
    useState<boolean>(false);
  const [showPasswordConfirmField, setShowPasswordConfirmField] =
    useState<boolean>(false);

  useEffect(() => {
    location.pathname === "/signup" && setShowPasswordConfirmField(true);
  }, [location]);

  useEffect(() => {
    emailRef?.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    setEmailIsValid(emailValidationTestPasses);
  }, [emailValidationTestPasses]);

  useEffect(() => {
    setPasswordIsValid(passwordValidationTestPasses);
  }, [password, passwordValidationTestPasses]);

  useEffect(() => {
    setConfirmPasswordIsValid(confirmPassword === password);
  }, [confirmPassword, password]);

  useEffect(() => {
    location.pathname === "/signup"
      ? setButtonName("create account")
      : setButtonName("continue");
  }, [location]);

  return (
    <Form id="user-credential-form" onSubmit={onSubmit}>
      <EmailInput
        email={email}
        emailIsFocus={emailIsFocus}
        emailIsValid={emailIsValid}
        emailRef={emailRef}
        setEmail={setEmail}
        setEmailIsFocus={setEmailIsFocus}
      />
      <PasswordInput
        password={password}
        passwordIsFocus={passwordIsFocus}
        passwordIsValid={passwordIsValid}
        setPassword={setPassword}
        setPasswordIsFocus={setPasswordIsFocus}
      />
      {showPasswordConfirmField && setConfirmPassword && (
        <>
          <PasswordConfirmInput
            confirmPassword={confirmPassword || ""}
            confirmPasswordIsFocus={confirmPasswordIsFocus}
            confirmPasswordIsValid={confirmPasswordIsValid}
            setConfirmPassword={setConfirmPassword}
            setConfirmPasswordIsFocus={setConfirmPasswordIsFocus}
          />
        </>
      )}
      <div id="user-credential-submit-btn">
        <Button disabled={!emailIsValid && !passwordIsValid} type="submit">
          {buttonName}
        </Button>
      </div>
    </Form>
  );
};

export default UserCredentialForm;
