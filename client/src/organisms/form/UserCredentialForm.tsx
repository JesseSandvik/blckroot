import { FormEventHandler, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "../../atoms/button/Button";
import EmailInput from "../../molecules/labeledInput/EmailInput";
import Form from "./Form";
import PasswordConfirmInput from "../../molecules/labeledInput/PasswordConfirmInput";
import PasswordInput from "../../molecules/labeledInput/PasswordInput";

type UserCredentialFormTypes = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const UserCredentialForm = ({
  onSubmit,
}: UserCredentialFormTypes): JSX.Element => {
  const location = useLocation();
  const [buttonName, setButtonName] = useState<string>("");
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
      <EmailInput />
      <PasswordInput />
      {showPasswordConfirmField && <PasswordConfirmInput />}
      <div>
        <Button type="submit">{buttonName}</Button>
      </div>
    </Form>
  );
};

export default UserCredentialForm;
