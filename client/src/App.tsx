import { NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav className='navbar'>
          <NavLink className="navbar brand" to="/">akago</NavLink>
        </nav>
      </header>
      <main>main</main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
