import AuthOptionsList from "../../molecules/nav/AuthOptionsList";
import BrandLogo from "../../molecules/nav/BrandLogo";

import "./Header.css";

const PrimaryHeader = (): JSX.Element => {
  return (
    <header>
      <BrandLogo />
      <AuthOptionsList />
    </header>
  );
};

export default PrimaryHeader;
