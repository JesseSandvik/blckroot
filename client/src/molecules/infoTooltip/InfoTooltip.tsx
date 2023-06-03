import { ReactNode } from "react";

import Icon from "../../atoms/icon/Icon";
import Tooltip from "../../atoms/tooltip/Tooltip";

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
  return (
    <Tooltip className={className} id={id} showTooltip={showInfoToolTip}>
      <Icon type="info" />
      {children}
    </Tooltip>
  );
};

export default InfoTooltip;
