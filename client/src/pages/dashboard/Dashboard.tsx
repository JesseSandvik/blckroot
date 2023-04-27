import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    console.log({ user });
    console.log("LOCAL STORAGE: ", getItem("user"));
  }, [getItem, user]);

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
