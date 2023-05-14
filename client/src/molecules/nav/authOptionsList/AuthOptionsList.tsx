import { useLocation } from "react-router-dom";

import IntLink from "../../../atoms/link/IntLink";

import "./AuthOptionsList.css";

const AuthOptionsList = () => {
  const location = useLocation();

  return (
    <nav id="auth-options">
      <ul id="auth-options-list">
        {location.pathname !== "/login" && (
          <li>
            <IntLink id="login-link" to="/login">
              login
            </IntLink>
          </li>
        )}
        {location.pathname !== "/signup" && (
          <li>
            <IntLink id="signup-link" to="/signup">
              signup
            </IntLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AuthOptionsList;
