import { Dispatch, RefObject } from "react";
import { handleGenericOnChange } from "../../utils/state/form";

import InfoTooltip from "../infoTooltip/InfoTooltip";
import LabeledInput from "./LabeledInput";
import ToggleFormFieldValidationIcons from "../toggleIcons/ToggleFormFieldValidationIcons";

type EmailInputProps = {
  email: string;
  emailIsFocus: boolean;
  emailIsValid: boolean;
  emailRef: RefObject<HTMLInputElement>;
  setEmail: Dispatch<React.SetStateAction<string>>;
  setEmailIsFocus: Dispatch<React.SetStateAction<boolean>>;
};

const EmailInput = ({
  email,
  emailIsFocus,
  emailIsValid,
  emailRef,
  setEmail,
  setEmailIsFocus,
}: EmailInputProps): JSX.Element => {
  return (
    <div className="user-credential-input">
      <LabeledInput
        aria-describedby="emailnote"
        aria-invalid={emailIsValid ? "false" : "true"}
        autoComplete="off"
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
      <ToggleFormFieldValidationIcons toggleValidationIconsOn={emailIsValid} />
      <InfoTooltip
        id="email-tooltip"
        showInfoToolTip={!emailIsValid && emailIsFocus && email.length > 0}
      >
        Please enter an email address with a valid format.
      </InfoTooltip>
    </div>
  );
};

export default EmailInput;
