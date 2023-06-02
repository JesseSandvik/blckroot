import { Dispatch } from "react";
import { handleGenericOnChange } from "../../utils/state/form";

import LabeledInput from "./LabeledInput";

type PasswordInputProps = {
  password: string;
  passwordIsValid: boolean;
  setPassword: Dispatch<React.SetStateAction<string>>;
  setPasswordIsFocus: Dispatch<React.SetStateAction<boolean>>;
};

const PasswordInput = ({
  password,
  passwordIsValid,
  setPassword,
  setPasswordIsFocus,
}: PasswordInputProps): JSX.Element => {
  return (
    <LabeledInput
      aria-describedby="passwordnote"
      aria-invalid={passwordIsValid ? "false" : "true"}
      className="input-user-credentials"
      inputId="password"
      label="password:"
      name="password"
      onBlur={() => setPasswordIsFocus(false)}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleGenericOnChange(event, setPassword)
      }
      onFocus={() => setPasswordIsFocus(true)}
      required
      type="password"
      value={password || ""}
    />
  );
};

export default PasswordInput;
