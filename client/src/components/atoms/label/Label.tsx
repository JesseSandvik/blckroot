import { ReactNode } from "react";

import "./Label.css";

type LabelProps = {
  children: ReactNode;
  className?: string;
  htmlFor: string;
  id?: string;
};

const Label = ({
  children,
  className,
  htmlFor,
  id,
}: LabelProps): JSX.Element => {
  return (
    <label className={className} htmlFor={htmlFor} id={id}>
      {children}
    </label>
  );
};

export default Label;
