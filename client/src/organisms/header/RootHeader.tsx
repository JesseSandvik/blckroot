import AuthOptionsList from "../../molecules/nav/AuthOptionsList";
import BrandLogo from "../../molecules/nav/BrandLogo";

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
