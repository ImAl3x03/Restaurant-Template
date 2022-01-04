import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { getMenu } from '../../../utils/menu';
import Menu from '../../../Model/menu';
import './Navbar.css'
import MenuSection from './MenuSection/MenuSection';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import anime from 'animejs';
import { WindowSharp } from '@mui/icons-material';

const iconStyle = makeStyles({
    root: {
        float: "right",
        marginTop: "20px",
        marginRight: "20px",
        cursor: "pointer"
    }
})

export default function Navbar() {
    let initialState: { [category: string]: Menu[] } = { "": [] }
    const [menu, addMenu] = useState(initialState);
    const [isOpen, setOpen] = useState(false);

    const renderingHierarchy: string[] = ["Primo", "Secondo", "Pizza", "Calzone", "Fritti", "Dolci", "Bevande"]

    const iconClasses = iconStyle();

    const handleOnClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        async function getAPI() {
            let response = await getMenu();
            addMenu(response);
        }

        getAPI();
    }, [])

    let animation: anime.AnimeInstance;

    function handleScroll() {
        if (window.scrollY < 800)
            animation.seek(window.scrollY / 4.5);
    }

    function linkScroll(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();

        document.querySelector("#contact")?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        animation = anime({
            targets: ".nav",
            width: ["50%", "93%"],
            "background-color": ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
            autoplay: false
        })
    }, [])

    let response: any = [];

    for (let key of renderingHierarchy) {
        if (key in menu) {
            response.push(
                <MenuSection title={key} element={menu[key]} />
            )
        }
    }

    return (
        <>
            <div className="nav fixed">
                <div className="link">
                    <span onClick={() => setOpen(true)}>Menù</span>
                </div>

                <div className='link'>
                    <a href='#contact' onClick={(e) => linkScroll(e)}>Contatti</a>
                </div>
            </div>

            <Dialog open={isOpen} onClose={handleOnClose} fullWidth={true} maxWidth="md">
                <DialogTitle>
                    <div className='title'>
                        Menù
                        <CloseIcon className={iconClasses.root} onClick={handleOnClose} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    {response}
                </DialogContent>
            </Dialog>
        </>
    );
}