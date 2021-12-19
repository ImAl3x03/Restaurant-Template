import Navbar from './Navbar/Navbar';
import './App.css';


export default function App() {
  return (
    <div>
      <div className='container'>
        <div className="half-width">
          <Navbar />
        </div>

        <div className="bg-transparent half-width flex-column">
          <h1>
            Pizzeria pizzeria
          </h1>
        </div>
      </div>

      <div style={{ height: "200vh" }} />
    </div>
  );
}
