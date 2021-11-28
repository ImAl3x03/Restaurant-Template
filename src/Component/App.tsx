import Navbar from './Navbar/Navbar';
import pizzaImage from '../Image/pizza-bg.jpg'
import './App.css'

export default function App() {
  return (
    <div>
        <Navbar />

        <img src={pizzaImage} alt="Background of the pizza" className='bg'/>

      <div style={{height: "200vh"}} />
    </div>
  );
}
