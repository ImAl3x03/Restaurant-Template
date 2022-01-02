import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { getMenu } from '../../../utils/menu';
import Menu from '../../../Model/menu';
import './Navbar.css'
import MenuSection from './MenuSection/MenuSection';

export default function Navbar() {
    let initialState: { [category: string]: Menu[] } = { "": [] }
    const [menu, addMenu] = useState(initialState);
    const [isOpen, setOpen] = useState(false);

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

    for (let key in menu) {
        response.push(
            <MenuSection title={key} element={menu[key]}/>
        )
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

            <Dialog open={isOpen} onClose={handleOnClose} >
                <DialogContent>
                    {response}
                </DialogContent>
            </Dialog>
        </>
    );
}