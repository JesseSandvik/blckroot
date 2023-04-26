import { useState, createContext } from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import HomePage from "./pages/Home";
import LoginPage from "./pages/login/Login";
import SignUpPage from "./pages/signup/SignUp";

import "./App.css";

interface User {
  email: String;
  password: String;
}

interface UserContext {
  email: String;
  password: String;
  setUser: () =>
}

const UserContext = createContext<UserContext | undefined>(undefined);

/**
 * TODO: Light/Dark Theme toggle
 */
// type ThemeContextType = "light" | "dark";
// const ThemeContext = createContext<ThemeContextType>("light");

function App() {
  const location = useLocation();

  const [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <header>
          <nav className="navbar">
            <div className="navbar-left-outer">
              <NavLink className="navbar brand" to="/">
                <i className="fa-solid fa-layer-group"></i>akago
              </NavLink>
            </div>
          </nav>
          <div className="navbar-right-outer">
            {location.pathname !== "/login" && (
              <NavLink to="/login">login</NavLink>
            )}
            {location.pathname !== "/signup" && (
              <NavLink to="/signup">sign up</NavLink>
            )}
          </div>
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
    </UserContext.Provider>
  );
}

export default App;
