import AuthOptionsList from "../../molecules/nav/authOptionsList/AuthOptionsList";
import BrandLogo from "../../molecules/nav/brandLogo/BrandLogo";

import "./Header.css";

const RootHeader = (): JSX.Element => {
  return (
    <header id="root-header">
      <BrandLogo />
      <AuthOptionsList />
    </header>
  );
};

export default RootHeader;
