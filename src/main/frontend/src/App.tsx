import "./App.css";
import Logo from './components/Logo/Logo';
import { Link } from 'react-router-dom';

function App() {

    // placeholder Links

    return (
        <main className="home">
            <Logo />
            <div className="home-buttons">
                <Link to={"/signup"}><button className="button-enabled" type="button">Solo</button></Link>
                <Link to={"/local"}><button className="button-enabled" type="button">Local</button></Link>
                <Link to={"/lobby"}><button className="button-enabled" type="button">Lobby</button></Link>
            </div>
        </main>
    );
}

export default App;
