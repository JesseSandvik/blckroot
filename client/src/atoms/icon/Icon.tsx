import { MouseEventHandler } from "react";

import "./Icon.css";

type IconProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  type: string;
};

const Icon = ({ className, onClick, title, type }: IconProps): JSX.Element => {
  const getIconType = (iconType: string): string => {
    const availableIcons: { [key: string]: string } = require("./icons.json");
    let foundIcon = "";
    for (const [key, value] of Object.entries(availableIcons)) {
      if (key === iconType) {
        foundIcon = value;
      }
    }
    return foundIcon;
  };

  const classProps = [];
  classProps.push(getIconType(type));
  className && classProps.push(className);
  return <i className={classProps.join(" ")} onClick={onClick} title={title} />;
};

export default Icon;
