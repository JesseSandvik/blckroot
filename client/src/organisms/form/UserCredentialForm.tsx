import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import Button from "../../atoms/button/Button";
import EmailInput from "../../molecules/labeledInput/EmailInput";
import Form from "./Form";
import PasswordConfirmInput from "../../molecules/labeledInput/PasswordConfirmInput";
import PasswordInput from "../../molecules/labeledInput/PasswordInput";

type UserCredentialFormTypes = {
  confirmPassword?: string;
  email: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  password: string;
  setConfirmPassword?: Dispatch<SetStateAction<string>>;
  setEmail?: Dispatch<SetStateAction<string>>;
  setPassword?: Dispatch<SetStateAction<string>>;
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
  const location = useLocation();
  const [buttonName, setButtonName] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] =
    useState<boolean>(false);
  const [showPasswordConfirmField, setShowPasswordConfirmField] =
    useState<boolean>(false);

  useEffect(() => {
    location.pathname === "/signup" && setShowPasswordConfirmField(true);
  }, [location]);

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
        setEmail={setEmail}
        setEmailIsValid={setEmailIsValid}
      />
      <PasswordInput
        password={password}
        passwordIsValid={passwordIsValid}
        setPassword={setPassword}
        setPasswordIsValid={setPasswordIsValid}
      />
      {showPasswordConfirmField && (
        <PasswordConfirmInput
          confirmPassword={confirmPassword}
          confirmPasswordIsValid={confirmPasswordIsValid}
          password={password}
          setConfirmPassword={setConfirmPassword || undefined}
          setConfirmPasswordIsValid={setConfirmPasswordIsValid}
        />
      )}
      <div>
        <Button type="submit">{buttonName}</Button>
      </div>
    </Form>
  );
};

export default UserCredentialForm;
