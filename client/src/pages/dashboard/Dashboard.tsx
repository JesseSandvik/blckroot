import { useContext, useEffect, useReducer } from "react";
import { authReducer, initialAuthState } from "../../context/auth/AuthReducer";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./Dashboard.css";

function Dashboard() {
  const [state] = useReducer(authReducer, initialAuthState);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    console.log(initialAuthState.isLoaded);
  }, []);

  useEffect(() => {
    state.isLoaded && state.user && console.log("USER: ", state.user);
  }, [state.isLoaded, state.user]);

  return (
    <main className="Dashboard">
      <section className="sidebar-menu">
        <ul>
          <li>placeholder</li>
          <li>placeholder</li>
          <li>placeholder</li>
          <li>placeholder</li>
          <li>placeholder</li>
        </ul>
      </section>
      <section className="body">
        <h1>DASHBOARD</h1>
      </section>
    </main>
  );
}

export default Dashboard;
