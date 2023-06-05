import { Dispatch } from "react";
import { handleGenericOnChange } from "../../../utils/form";

import InfoTooltip from "../infoTooltip/InfoTooltip";
import LabeledInput from "./LabeledInput";
import ToggleFormFieldValidationIcons from "../toggleIcons/ToggleFormFieldValidationIcons";

type ConfirmPasswordInputProps = {
  confirmPassword: string;
  confirmPasswordIsFocus: boolean;
  confirmPasswordIsValid: boolean;
  setConfirmPassword: Dispatch<React.SetStateAction<string>>;
  setConfirmPasswordIsFocus: Dispatch<React.SetStateAction<boolean>>;
};

const PasswordConfirmInput = ({
  confirmPassword,
  confirmPasswordIsFocus,
  confirmPasswordIsValid,
  setConfirmPassword,
  setConfirmPasswordIsFocus,
}: ConfirmPasswordInputProps): JSX.Element => {
  return (
    <div className="user-credential-input">
      <LabeledInput
        aria-describedby="confirmpasswordnote"
        aria-invalid={confirmPasswordIsValid ? "false" : "true"}
        inputId="confirm_password"
        label="confirm password:"
        name="confirm_password"
        onBlur={() => setConfirmPasswordIsFocus(false)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleGenericOnChange(event, setConfirmPassword)
        }
        onFocus={() => setConfirmPasswordIsFocus(true)}
        required
        type="password"
        value={confirmPassword || ""}
      />
      <ToggleFormFieldValidationIcons
        toggleValidationIconsOn={
          confirmPasswordIsValid && confirmPassword.length > 0
        }
      />
      <InfoTooltip
        id="confirm-password-tooltip"
        showInfoToolTip={confirmPasswordIsFocus && !confirmPasswordIsValid}
      >
        Must match the password from the above input field.
      </InfoTooltip>
    </div>
  );
};

export default PasswordConfirmInput;
