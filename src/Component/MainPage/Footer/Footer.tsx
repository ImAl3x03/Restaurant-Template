import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Map from './Map/Map'
import Facebook from '../../../Image/facebook.png';
import Instagram from '../../../Image/instagram.png'
import css from './Footer.module.css'

export default function Footer() {
    return (
        <footer id="contact" className="rounded-t-2xl mt-[50px] bg-[#F5F5F5]">
            <div className={css.footerContainer} >
                <div className="flex flex-col justify-around text-center">
                    <h2 className="text-[3em]">Pizzeria template</h2>

                    <div className='my-[20px]'>
                        <h3 className="text-[2em]">Seguici su:</h3>
                        <img className="inline w-[50px] h-[50px] mr-[10px]" src={Instagram} alt="Instagram image"/>
                        <img className="inline w-[50px] h-[50px] mr-[10px]" src={Facebook} alt="Facebook image"/>
                    </div>

                    <p className="my-[20px] text-[20px]">
                        Per info e prenotazioni
                        <br/>
                        <LocalPhoneIcon/> <span className='ml-[10px]'>+39 XXX XXX XXXX</span>
                        <br/>
                        <EmailIcon/> <span className='ml-[10px]'>pizzeria-template@example.com</span>
                    </p>
                </div>
                <Map/>
            </div>

            <div className="text-center">
                <p className="my-[20px] text-[20px]">
                    Pizzeria template - &copy; ALL RIGTHS RESERVED
                </p>
            </div>

            <div className="text-center mb-[10px]">
                <p>This web site is built using a template</p>
                <p>Alessandro Di Maria - MIT License &copy; ALL RIGTHS RESERVED</p>
            </div>
        </footer>
    )
}
