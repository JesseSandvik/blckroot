import { NavLink } from "react-router-dom";
import { app } from "../../app/index";

import Icon from "../../atoms/icon/Icon";

const BrandLogo = () => {
  return (
    <nav id="brand-logo">
      <NavLink id="brand-link" to="/">
        <Icon type={app.logo} />
        {app.name}
      </NavLink>
    </nav>
  );
};

export default BrandLogo;
