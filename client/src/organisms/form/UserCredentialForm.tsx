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
import ToggleFormFieldValidationIcons from "../../molecules/toggleIcons/ToggleFormFieldValidationIcons";

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

  const location = useLocation();
  const [buttonName, setButtonName] = useState<string>("");

  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [emailIsFocus, setEmailIsFocus] = useState<boolean>(false);

  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
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
    location.pathname === "/signup"
      ? setButtonName("create account")
      : setButtonName("continue");
  }, [location]);

  return (
    <Form onSubmit={onSubmit}>
      <EmailInput
        email={email}
        emailIsValid={emailIsValid}
        emailRef={emailRef}
        setEmail={setEmail}
        setEmailIsFocus={setEmailIsFocus}
      />
      <ToggleFormFieldValidationIcons toggleValidationIconsOn={emailIsValid} />
      <InfoTooltip
        showInfoToolTip={!emailIsValid && emailIsFocus && email.length > 0}
      >
        Please enter an email address with a valid format.
      </InfoTooltip>
      <PasswordInput
        password={password}
        passwordIsValid={passwordIsValid}
        setPassword={setPassword}
        setPasswordIsValid={setPasswordIsValid}
      />
      <ToggleFormFieldValidationIcons
        toggleValidationIconsOn={passwordIsValid}
      />
      {showPasswordConfirmField && setConfirmPassword && (
        <>
          <PasswordConfirmInput
            confirmPassword={confirmPassword || ""}
            confirmPasswordIsValid={confirmPasswordIsValid}
            password={password}
            setConfirmPassword={setConfirmPassword}
            setConfirmPasswordIsValid={setConfirmPasswordIsValid}
          />
          <ToggleFormFieldValidationIcons
            toggleValidationIconsOn={confirmPasswordIsValid}
          />
        </>
      )}
      <div>
        <Button type="submit">{buttonName}</Button>
      </div>
    </Form>
  );
};

export default UserCredentialForm;
