import { ReactNode } from "react";

import "./Tooltip.css";

type TooltipPropTypes = {
  children: ReactNode;
  className?: string;
  id?: string;
  showTooltip?: boolean;
};

const Tooltip = ({
  children,
  className,
  id,
  showTooltip,
}: TooltipPropTypes) => {
  const classProps = [];
  classProps.push("tooltip");
  className && classProps.push(className);

  showTooltip ? classProps.push("instructions") : classProps.push("offscreen");

  return (
    <div className={classProps.join(" ")} id={id}>
      {children}
    </div>
  );
};

export default Tooltip;
