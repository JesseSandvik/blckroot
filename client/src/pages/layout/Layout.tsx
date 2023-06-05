import { Routes, Route } from "react-router-dom";
import { routes } from "../../app/routes";

import RootFooter from "../../organisms/footer/RootFooter";
import RootHeader from "../../organisms/header/RootHeader";
import RootMain from "../../organisms/main/RootMain";

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
