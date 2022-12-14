import "./Landing.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const Landing = () => (
    <main className="home">
        <Logo />
        <div className="home-buttons">
            <Link to={"/signup"}><button className="button-enabled" type="button">Solo</button></Link>
            <Link to={"/local"}><button className="button-enabled" type="button">Local</button></Link>
            <Link to={"/lobby"}><button className="button-enabled" type="button">Lobby</button></Link>
        </div>
    </main>
);

export default Landing;
