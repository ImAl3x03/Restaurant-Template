import Navbar from "../Navbar/Navbar"
import pizzaLogo from '../../../Image/pizza-logo.jpg'

export default function Header() {
    return (
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
    )
}