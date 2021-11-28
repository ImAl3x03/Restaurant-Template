import './Navbar.css'

export default function navbar() {
    return (
        <div className="nav fixed">
            <div className="link">
                <span>Pizza</span>
            </div>

            <div className='link'>
                <span>Calzoni</span>
            </div>

            <div className='link'>
                <span>Dolci</span>
            </div>

            <div className='link'>
                <span>Contatti</span>
            </div>
        </div>
    );
}