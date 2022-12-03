import './Landing.css';
import Logo from "../Logo/Logo";
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Landing() {

    return (
        <main className="home">
            <Logo />
            <div className="home-buttons">
                <Button>Solo</Button>
                <Link to={"/local"}><Button>Local</Button></Link>
                <Link to={"/lobby"}><Button>Lobby</Button></Link>
            </div>
        </main>
    );
}

export default Landing;
