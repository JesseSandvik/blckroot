import { ReactNode } from "react";

import Small from "../../atoms/small/Small";

type SectionMainFooterTypes = {
  children: ReactNode;
};

const SectionMainFooter = ({ children }: SectionMainFooterTypes) => {
  return (
    <footer id="section-main-footer">
      <Small>{children}</Small>
    </footer>
  );
};

export default SectionMainFooter;
