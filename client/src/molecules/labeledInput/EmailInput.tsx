import { Dispatch, useMemo, useEffect, useRef, useState } from "react";
import { handleGenericOnChange } from "../../utils/state/form";

import Icon from "../../atoms/icon/Icon";
import LabeledInput from "./LabeledInput";

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
  const [emailIsFocus, setEmailIsFocus] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef?.current && emailRef.current.focus();
  }, []);

  return (
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
  );
};

export default EmailInput;
