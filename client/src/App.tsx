import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import HomePage from "./pages/home/Home";
import Icon from "./atoms/icon/Icon";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/SignUp";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <footer>
        <div className="copyright">
          <small>
            Copyright &copy; {new Date().getFullYear()} Jesse Sandvik. All
            rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
