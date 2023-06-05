import { ReactNode } from "react";

import Icon from "../../atoms/icon/Icon";
import Tooltip from "../../atoms/tooltip/Tooltip";

import "./InfoTooltip.css";

type InfoTooltipPropTypes = {
  className?: string;
  children: ReactNode;
  id?: string;
  showInfoToolTip: boolean;
};

const InfoTooltip = ({
  className,
  children,
  id,
  showInfoToolTip,
}: InfoTooltipPropTypes) => {
  const classProps = [];
  classProps.push("info-tooltip");
  className && classProps.push(className);

  return (
    <Tooltip
      className={classProps.join(" ")}
      id={id}
      showTooltip={showInfoToolTip}
    >
      <Icon type="info" />
      {children}
    </Tooltip>
  );
};

export default InfoTooltip;
