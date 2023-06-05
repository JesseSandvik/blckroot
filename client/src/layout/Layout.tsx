import { Routes, Route } from "react-router-dom";
import { routes } from "../app/routes";

import RootFooter from "../components/organisms/footer/RootFooter";
import RootHeader from "../components/organisms/header/RootHeader";
import RootMain from "../components/organisms/main/RootMain";

import "./Layout.css";

const Layout = (): JSX.Element => {
  return (
    <>
      <RootHeader />
      <RootMain>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </RootMain>
      <RootFooter />
    </>
  );
};

export default Layout;
