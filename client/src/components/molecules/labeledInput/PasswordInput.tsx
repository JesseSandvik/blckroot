import { Dispatch } from "react";
import { handleGenericOnChange } from "../../../utils/form";

import InfoTooltip from "../infoTooltip/InfoTooltip";
import LabeledInput from "./LabeledInput";
import ToggleFormFieldValidationIcons from "../toggleIcons/ToggleFormFieldValidationIcons";

type PasswordInputProps = {
  password: string;
  passwordIsFocus: boolean;
  passwordIsValid: boolean;
  setPassword: Dispatch<React.SetStateAction<string>>;
  setPasswordIsFocus: Dispatch<React.SetStateAction<boolean>>;
};

const PasswordInput = ({
  password,
  passwordIsFocus,
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
      <InfoTooltip
        id="password-tooltip"
        showInfoToolTip={
          passwordIsFocus && !passwordIsValid && password.length > 0
        }
      >
        <>
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
        </>
      </InfoTooltip>
    </div>
  );
};

export default PasswordInput;
