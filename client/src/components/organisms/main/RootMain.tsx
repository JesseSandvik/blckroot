import { ReactNode } from "react";

type RootMainTypes = {
  children: ReactNode;
};

const RootMain = ({ children }: RootMainTypes): JSX.Element => {
  return <main id="root-main">{children}</main>;
};

export default RootMain;
