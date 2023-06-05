import { MouseEventHandler } from "react";

import "./Icon.css";

const getIconType = (iconType: string): string => {
  const availableIcons: Map<string, string> = new Map(
    Object.entries(require("./icons.json"))
  );
  return availableIcons.get(iconType) || "";
};

type IconProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  type: string;
};

const Icon = ({ className, onClick, title, type }: IconProps): JSX.Element => {
  const classProps = [];
  classProps.push(getIconType(type));
  className && classProps.push(className);
  classProps.push(type);
  return <i className={classProps.join(" ")} onClick={onClick} title={title} />;
};

export default Icon;
