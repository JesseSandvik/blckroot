import { FormEventHandler, ReactNode } from "react";

import Button from "../../atoms/button/Button";
import Form from "../../organisms/form/Form";
import Heading from "../../atoms/heading/Heading";

import "./UserFormPage.css";

type UserFormPageTemplateProps = {
  firstInput: ReactNode;
  secondInput: ReactNode;
  thirdInput?: ReactNode;
  formFooter: ReactNode;
  onFormSubmit: FormEventHandler<HTMLFormElement>;
  pageHeading: string;
  submitButtonName: string;
  submitButtonDisabled: boolean;
};

const UserFormPageTemplate = ({
  firstInput,
  secondInput,
  thirdInput,
  formFooter,
  onFormSubmit,
  pageHeading,
  submitButtonName,
  submitButtonDisabled,
}: UserFormPageTemplateProps): JSX.Element => {
  return (
    <main className="User-Form">
      <div className="form-header">
        <Heading tag="1">{pageHeading}</Heading>
      </div>
      <Form onSubmit={onFormSubmit}>
        <div className="input-container">{firstInput}</div>
        <div className="input-container">{secondInput}</div>
        {thirdInput && <div className="input-container">{thirdInput}</div>}
        <Button disabled={submitButtonDisabled} type="submit">
          {submitButtonName}
        </Button>
      </Form>
      <div className="form-footer">{formFooter}</div>
    </main>
  );
};

export default UserFormPageTemplate;
