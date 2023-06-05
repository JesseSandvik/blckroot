import { MouseEventHandler } from "react";

import Icon from "../../atoms/icon/Icon";

type ToggleIconsPropTypes = {
  className?: string;
  firstIconClassName?: string;
  firstIconOnClick?: MouseEventHandler<HTMLButtonElement>;
  firstIconTitle?: string;
  firstIconType: string;
  id?: string;
  secondIconClassName?: string;
  secondIconOnClick?: MouseEventHandler<HTMLButtonElement>;
  secondIconTitle?: string;
  secondIconType: string;
  toggleOn: boolean;
};

const ToggleIcons = ({
  className,
  firstIconClassName,
  firstIconOnClick,
  firstIconTitle,
  firstIconType,
  id,
  secondIconClassName,
  secondIconOnClick,
  secondIconTitle,
  secondIconType,
  toggleOn,
}: ToggleIconsPropTypes) => {
  // TODO: add toggle hide/show
  return (
    <div className={className} id={id}>
      <Icon
        className={toggleOn ? "hide" : firstIconClassName}
        onClick={firstIconOnClick}
        title={firstIconTitle}
        type={firstIconType}
      />
      {toggleOn && (
        <Icon
          className={toggleOn ? secondIconClassName : "hide"}
          onClick={secondIconOnClick}
          title={secondIconTitle}
          type={secondIconType}
        />
      )}
    </div>
  );
};

export default ToggleIcons;
