import { FormEventHandler, ReactNode } from "react";

import "./Form.css";

type FormProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const Form = ({
  children,
  className,
  id,
  onSubmit,
}: FormProps): JSX.Element => {
  return (
    <form className={className} id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
