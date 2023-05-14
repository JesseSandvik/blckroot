import Layout from "./templates/layout/Layout";

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
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
