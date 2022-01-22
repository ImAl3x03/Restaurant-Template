import Review from './Review/Review';
import Footer from './Footer/Footer';
import Navbar from "./Navbar/Navbar";
import css from './MainPage.module.css';
import pizzaLogo from '../../Image/pizza-logo.jpg';

export default function MainPage() {
    return (
        <>
            <div className={"w-full max-h-screen h-[1000px] flex " + css.headerContainer}>
                <div className="w-1/2">
                    <Navbar />
                </div>

                <div className={css.bgHeader + " w-1/2 max-h-screen h-[100%] flex flex-col justify-center"}>
                    <h1 className="text-white text-center text-[2em] md:text-[4em]">
                        Pizzeria template
                    </h1>

                    <img src={pizzaLogo} alt="Logo pizzeria"
                         className="w-[75%] md:w-[60%] h-auto mx-auto mt-[30px] rounded-[50%]" />
                </div>
            </div>

            <Review />

            <Footer />
        </>
    );
}