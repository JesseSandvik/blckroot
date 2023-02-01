import { NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <nav className='navbar'>
          <div className='navbar-left-outer'>
            <NavLink className="navbar brand" to="/"><i className="fa-solid fa-robot"></i>akago</NavLink>
          </div>
        </nav>
      </header>
      <main>main</main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
