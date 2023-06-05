import { createElement, ReactNode } from "react";

import "./Heading.css";

type HeadingProps = {
  children: ReactNode;
  className?: string;
  tag: string;
};

const Heading = ({ children, className, tag }: HeadingProps): JSX.Element => {
  return createElement(`h${tag}`, className, children);
};

export default Heading;
