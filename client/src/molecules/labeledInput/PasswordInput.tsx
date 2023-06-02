import { Dispatch } from "react";
import { handleGenericOnChange } from "../../utils/state/form";

import LabeledInput from "./LabeledInput";
import ToggleFormFieldValidationIcons from "../toggleIcons/ToggleFormFieldValidationIcons";

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
    <div className="user-credential-input">
      <LabeledInput
        aria-describedby="passwordnote"
        aria-invalid={passwordIsValid ? "false" : "true"}
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
      <ToggleFormFieldValidationIcons
        toggleValidationIconsOn={passwordIsValid}
      />
    </div>
  );
};

export default PasswordInput;
