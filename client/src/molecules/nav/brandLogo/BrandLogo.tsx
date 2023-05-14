import { app } from "../../../app/index";

import Icon from "../../../atoms/icon/Icon";
import IntLink from "../../../atoms/intLink/IntLink";

import "./BrandLogo.css";

const BrandLogo = () => {
  return (
    <nav id="brand-logo">
      <IntLink id="brand-link" to="/">
        <Icon type={app.logo} />
        {app.name}
      </IntLink>
    </nav>
  );
};

export default BrandLogo;
