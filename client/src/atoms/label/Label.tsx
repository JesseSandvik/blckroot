import { ReactNode } from "react";

import "./Label.css";

type LabelProps = {
  children: ReactNode;
  className?: string;
  htmlFor: string;
};

const Label = ({ children, className, htmlFor }: LabelProps): JSX.Element => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
