import { Routes, Route } from "react-router-dom";
import { routes } from "../../app/routes";

import PrimaryHeader from "../../organisms/header/PrimaryHeader";

const Layout = () => {
  return (
    <>
      <PrimaryHeader />
      <main>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default Layout;
