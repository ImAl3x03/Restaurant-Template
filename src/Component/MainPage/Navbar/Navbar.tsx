import {useState, useEffect, useMemo, useCallback} from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {makeStyles} from '@mui/styles';
import axios from 'axios';
import MenuSection from './MenuSection/MenuSection';
import CloseIcon from '@mui/icons-material/Close';
import anime from 'animejs';
import Menu from '../../../Model/menu';
import css from './Navbar.module.css';

const URL = "https://localhost:44369/api/Menu";
const renderingHierarchy = ["Primo", "Secondo", "Pizza", "Calzone", "Fritti", "Dolci", "Bevande"];
let animation: anime.AnimeInstance;

const iconStyle = makeStyles({
    root: {
        float: "right",
        marginTop: "20px",
        marginRight: "20px",
        cursor: "pointer"
    }
})

export default function Navbar() {
    //State for the menu
    const [menu, addMenu] = useState<{ [category: string]: Menu[] }>({"": []});

    //State for open the popup
    const [isOpen, setOpen] = useState<boolean>(false);

    //Generating the style for the icon
    const iconClasses = iconStyle();

    /***********************************
     ****** API CALL FOR THE MENU ******
     ***********************************/
    useEffect(() => {
        axios.get(URL)
            .then(res => {
                addMenu(res.data);
            })
    }, [])

    /**************************************************
     ****** CREATING THE ANIMATION OF THE NAVBAR ******
     **************************************************/
    useEffect(() => {
        animation = anime({
            targets: "nav",
            width: ["50%", "93%"],
            "background-color": ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"],
            autoplay: false
        })

        window.addEventListener("scroll", () => {
            if (window.scrollY < 800)
                animation.seek(window.scrollY / 3.8);
        });
    }, [])

    /************************************
     ****** FUNCTION FOR MENU CARD ******
     ************************************/
    const response = useMemo(() => {
        let intern: JSX.Element[] = [];

        for (let key of renderingHierarchy) {
            if (key in menu) {
                intern.push(
                    <MenuSection title={key} element={menu[key]} key={key}/>
                )
            }
        }

        return intern;
    }, [menu])

    //Function for closing the menu popup
    const handleOnClose = useCallback(() => {
        setOpen(false);
    }, [])

    return (
        <>
            <nav className="flex justify-around pb-[15px] fixed z-[1]">
                <div className="link mt-[20px]">
                    <span className={"text-white no-underlined cursor-pointer text-[20px] md:text-[35px] " + css.navFont}
                        onClick={() => setOpen(true)}>Menù</span>
                </div>

                <div className='mt-[20px] link'>
                    <a className={"text-white no-underlined cursor-pointer text-[20px] md:text-[35px] " + css.navFont}
                        href='#contact'>Contatti</a>
                </div>
            </nav>

            <Dialog open={isOpen} onClose={handleOnClose} fullWidth={true} maxWidth="md">
                <DialogTitle>
                    <div className={"text-center mx-auto text-[35px] " + css.title}>
                        Menù
                        <CloseIcon className={iconClasses.root} onClick={handleOnClose}/>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {response}
                </DialogContent>
            </Dialog>
        </>
    );
}