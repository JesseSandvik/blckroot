import { Dispatch, FormEventHandler, SetStateAction } from "react";

import UserCredentialForm from "../../components/organisms/form/UserCredentialForm";

import "./UserCredentialPageTemplate.css";

type UserCredentialPageTemplateProps = {
  confirmPassword?: string;
  email: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  password: string;
  setConfirmPassword?: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

const UserCredentialPageTemplate = ({
  confirmPassword,
  email,
  onSubmit,
  password,
  setConfirmPassword,
  setEmail,
  setPassword,
}: UserCredentialPageTemplateProps): JSX.Element => {
  return (
    <section id="user-credential-page">
      {/* <Header>
        <Heading tag="1">{pageHeading}</Heading>
      </Header> */}
      {/* <Footer>{formFooter}</Footer> */}
      <UserCredentialForm
        confirmPassword={confirmPassword}
        email={email}
        onSubmit={onSubmit}
        password={password}
        setConfirmPassword={setConfirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </section>
  );
};

export default UserCredentialPageTemplate;
