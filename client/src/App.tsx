import { useContext, useEffect } from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/auth/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
// import HomePage from "./pages/Home";
import HomePage from "./pages/home/Home";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/SignUp";

import "./App.css";

/**
 * TODO: Light/Dark Theme toggle
 */
// type ThemeContextType = "light" | "dark";
// const ThemeContext = createContext<ThemeContextType>("light");

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <AuthProvider>
      <div className="App">
        <header>
          <nav className="navbar-left">
            <ul>
              <li>
                <NavLink className="navbar brand" to="/">
                  <i className="fa-solid fa-layer-group"></i>blackroot
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
                  <NavLink to="/signup">sign up</NavLink>
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
    </AuthProvider>
  );
}

export default App;
