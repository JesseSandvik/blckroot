import { Dispatch, useMemo, useEffect, useRef, useState } from "react";
import { handleGenericOnChange } from "../../utils/state/form";

import Icon from "../../atoms/icon/Icon";
import LabeledInput from "../labeledInput/LabeledInput";

type EmailInputProps = {
  email: string;
  emailIsValid: boolean;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setEmailIsValid: Dispatch<React.SetStateAction<boolean>>;
};

const EmailInput = ({
  email,
  emailIsValid,
  setEmail,
  setEmailIsValid,
}: EmailInputProps): JSX.Element => {
  const EMAIL_REGEX = useMemo(() => /^\S+@\S+\.\S+$/, []);
  const [emailIsFocus, setEmailIsFocus] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const emailValidationTestPasses = EMAIL_REGEX.test(email);

  useEffect(() => {
    emailRef?.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    setEmailIsValid(emailValidationTestPasses);
  }, [emailValidationTestPasses]);

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
          handleGenericOnChange(event, setEmail)
        }
        onFocus={() => setEmailIsFocus(true)}
        inputRef={emailRef}
        required
        type="email"
        value={email || ""}
      />
      <div className="input-status">
        <Icon className={emailIsValid ? "success" : "hide"} type="checkmark" />
        <Icon
          className={emailIsValid || !email ? "hide" : "alert"}
          type="x-mark"
        />
      </div>
      <p
        id="emailnote"
        className={
          emailIsFocus && email && !emailIsValid ? "instructions" : "offscreen"
        }
      >
        <Icon type="info" />
        Please enter an email address with a valid format.
      </p>
    </>
  );
};

export default EmailInput;
