import Map from './Map/Map'
import './Footer.css'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Facebook from '../../../Image/facebook.png';
import Instagram from '../../../Image/instagram.png'

export default function Footer() {


    return (
        <footer id="contact">
            <div className="footer-container">
                <div className='footer-content'>
                    <h2>Pizzeria template</h2>
                    
                    <div className='social'>
                        <h3>Seguici su:</h3>
                        <img src={Instagram} alt="Instagram image" />
                        <img src={Facebook} alt="Facebook image" />
                    </div>

                    <p>
                        Per info e prenotazioni
                        <br />
                        <LocalPhoneIcon /> <span className='contact-info'>+39 XXX XXX XXXX</span>
                        <br />
                        <EmailIcon /> <span className='contact-info'>pizzeria-template@example.com</span>
                    </p>
                    
                    <p>
                        Pizzeria template - &copy; ALL RIGTHS RESERVED
                    </p>
                </div>
                <Map />
            </div>

            <div className="site-creator">
                <p>This web site is built using a template</p>
                <p>Alessandro Di Maria - MIT License &copy; ALL RIGTHS RESERVED</p>
            </div>
        </footer>

    )
}