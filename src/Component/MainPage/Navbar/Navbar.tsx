import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { getMenu } from '../../../utils/menu';
import Menu from '../../../Model/menu';
import './Navbar.css'
import MenuSection from './MenuSection/MenuSection';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

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
                    <span>Contatti</span>
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