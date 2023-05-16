import { FormEventHandler, ReactNode } from "react";

import Button from "../../atoms/button/Button";
import Form from "../../organisms/form/Form";

import "./UserCredentialForm.css";

type UserCredentialFormTemplateProps = {
  firstInput: ReactNode;
  secondInput: ReactNode;
  thirdInput?: ReactNode;
  formFooter: ReactNode;
  onFormSubmit: FormEventHandler<HTMLFormElement>;
  pageHeading: string;
  submitButtonName: string;
  submitButtonDisabled: boolean;
};

const UserCredentialFormTemplate = ({
  firstInput,
  secondInput,
  thirdInput,
  formFooter,
  onFormSubmit,
  pageHeading,
  submitButtonName,
  submitButtonDisabled,
}: UserCredentialFormTemplateProps): JSX.Element => {
  return (
    <section id="user-credential-form">
      {/* <Header>
        <Heading tag="1">{pageHeading}</Heading>
      </Header> */}
      <Form onSubmit={onFormSubmit}>
        <div className="input-container">{firstInput}</div>
        <div className="input-container">{secondInput}</div>
        {thirdInput && <div className="input-container">{thirdInput}</div>}
        <div className="form-btn-group">
          <Button disabled={submitButtonDisabled} type="submit">
            {submitButtonName}
          </Button>
        </div>
      </Form>
      {/* <Footer>{formFooter}</Footer> */}
    </section>
  );
};

export default UserCredentialFormTemplate;
