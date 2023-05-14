import { ReactNode } from "react";

type SmallPropTypes = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const Small = ({ children, className, id }: SmallPropTypes): JSX.Element => {
  return (
    <small className={className} id={id}>
      {children}
    </small>
  );
};

export default Small;
