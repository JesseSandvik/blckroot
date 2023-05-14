import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import "./IntLink.css";

type IntLinkPropTypes = {
  children: ReactNode;
  className?: string;
  id?: string;
  to: string;
};

const IntLink = ({
  children,
  className,
  id,
  to,
}: IntLinkPropTypes): JSX.Element => {
  return (
    <NavLink className={className} id={id} to={to}>
      {children}
    </NavLink>
  );
};

export default IntLink;
