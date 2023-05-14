import { app } from "../app/index";

const Copyright = () => {
  return (
    <small>
      Copyright &copy; {new Date().getFullYear()} {app.name}. All rights
      reserved.
    </small>
  );
};

export default Copyright;
