import { Dispatch, RefObject } from "react";
import { handleGenericOnChange } from "../../utils/state/form";

import LabeledInput from "./LabeledInput";

type EmailInputProps = {
  email: string;
  emailIsValid: boolean;
  emailRef: RefObject<HTMLInputElement>;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setEmailIsFocus: Dispatch<React.SetStateAction<boolean>>;
};

const EmailInput = ({
  email,
  emailIsValid,
  emailRef,
  setEmail,
  setEmailIsFocus,
}: EmailInputProps): JSX.Element => {
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
