import { Dispatch, useMemo, useEffect, useState } from "react";

import Icon from "../../atoms/icon/Icon";
import LabeledInput from "../labeledInput/LabeledInput";

type PasswordInputProps = {
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
};

const PasswordInput = ({
  handleOnChange,
  password,
  setPassword,
}: PasswordInputProps): JSX.Element => {
  const PASSWORD_REGEX = useMemo(
    () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    []
  );
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState<boolean>(false);

  const passwordValidationTestPasses = PASSWORD_REGEX.test(password);

  useEffect(() => {
    setPasswordIsValid(passwordValidationTestPasses);
  }, [password, passwordValidationTestPasses]);

  return (
    <>
      <LabeledInput
        aria-describedby="passwordnote"
        aria-invalid={passwordIsValid ? "false" : "true"}
        className="input-user-credentials"
        inputId="password"
        label="password:"
        name="password"
        onBlur={() => setPasswordIsFocus(false)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(event, setPassword)
        }
        onFocus={() => setPasswordIsFocus(true)}
        required
        type="password"
        value={password || ""}
      />
      <div className="input-status">
        <Icon
          className={passwordIsValid ? "success" : "hide"}
          type="checkmark"
        />
        <Icon
          className={passwordIsValid || !password ? "hide" : "alert"}
          type="x-mark"
        />
      </div>
      <p
        id="passwordnote"
        className={
          passwordIsFocus && !passwordIsValid ? "instructions" : "offscreen"
        }
      >
        <Icon type="info" />
        8 to 24 characters.
        <br />
        Must include uppercase & lowercase letters, a number, & a special
        character.
        <br />
        Allowed special characters: <span aria-label="exclamation mark">!</span>
        <span aria-label="at symbol">@</span>
        <span aria-label="hashtag">#</span>
        <span aria-label="dollar sign">$</span>
        <span aria-label="percent">%</span>
      </p>
    </>
  );
};

export default PasswordInput;
