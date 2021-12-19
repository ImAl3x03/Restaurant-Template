import Navbar from './Navbar/Navbar';
import './App.css';
import pizzaLogo from '../Image/pizza-logo.jpg';

export default function App() {
  return (
    <div>
      <div className='container'>
        <div className="half-width">
          <Navbar />
        </div>

        <div className="bg-transparent half-width flex-column">
          <h1>
            Pizzeria template
          </h1>

          <img src={pizzaLogo} alt="Logo pizzeria" className="logo" />
        </div>
      </div>

      <div style={{ height: "200vh" }} />
    </div>
  );
}
