import { NavLink, Routes, Route, useLocation } from "react-router-dom";

import Icon from "./atoms/icon/Icon";

import { routes } from "./app/routes";

import "./App.css";

/**
 * TODO: Light/Dark Theme toggle
 */
// type ThemeContextType = "light" | "dark";
// const ThemeContext = createContext<ThemeContextType>("light");

/**
 * TODO: Inspiration quote generator, display new quote daily.
 * Make a separate API with database for the quotes?
 */

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <header>
        <nav className="navbar-left">
          <ul>
            <li>
              <NavLink className="navbar brand" to="/">
                <Icon type="brand-logo" />
                blckroot
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className="navbar-right">
          <ul>
            {location.pathname !== "/login" && (
              <li>
                <NavLink to="/login">login</NavLink>
              </li>
            )}
            {location.pathname !== "/signup" && (
              <li>
                <NavLink className="sign-up" to="/signup">
                  sign up
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <footer>
        <div className="copyright">
          <small>
            Copyright &copy; {new Date().getFullYear()} Blckroot. All rights
            reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
