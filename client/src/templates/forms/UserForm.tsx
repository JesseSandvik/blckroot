import { FormEventHandler } from "react";

import Button from "../../atoms/button/Button";
import Form from "../../organisms/form/Form";
import Heading from "../../atoms/heading/Heading";
import Icon from "../../atoms/icon/Icon";
import LabeledInput from "../../molecules/labeledInput/LabeledInput";

type UserFormTemplateProps = {
  onFormSubmit: FormEventHandler<HTMLFormElement>;
  pageClassName: string;
  pageHeading: string;
  submitButtonName: string;
};

const UserFormTemplate = ({
  onFormSubmit,
  pageClassName,
  pageHeading,
  submitButtonName,
}: UserFormTemplateProps): JSX.Element => {
  return (
    <main className={pageClassName}>
      <Heading tag="1">{pageHeading}</Heading>
      <Form onSubmit={onFormSubmit}>
        <Button type="submit">{submitButtonName}</Button>
      </Form>
    </main>
  );
};

export default UserFormTemplate;
