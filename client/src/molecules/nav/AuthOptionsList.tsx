import { NavLink, useLocation } from "react-router-dom";

const AuthOptionsList = () => {
  const location = useLocation();

  return (
    <nav id="auth-options">
      <ul>
        {location.pathname !== "/login" && (
          <li>
            <NavLink id="login-link" to="/login">
              login
            </NavLink>
          </li>
        )}
        {location.pathname !== "/signup" && (
          <li>
            <NavLink id="signup-link" to="/signup">
              sign up
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AuthOptionsList;
