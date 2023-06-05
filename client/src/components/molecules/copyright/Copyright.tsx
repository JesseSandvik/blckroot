import { app } from "../../../app";

import Small from "../../atoms/small/Small";

import "./Copyright.css";

const Copyright = (): JSX.Element => {
  return (
    <Small id="copyright">
      Copyright &copy; {new Date().getFullYear()} {app.name}. All rights
      reserved.
    </Small>
  );
};

export default Copyright;
