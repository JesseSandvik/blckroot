import { ReactNode } from "react";

import "./Label.css";

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
};

const Label = ({ children, htmlFor }: LabelProps): JSX.Element => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default Label;
