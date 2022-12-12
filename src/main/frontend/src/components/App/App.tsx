import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Landing from "../Landing/Landing";
import Connect4Local from "../Connect4Local/Connect4Local";
import Connect4Multiplayer from "../Connect4Multiplayer/Connect4Multiplayer";
import Signup from "../Signup/Signup";
import {UserProvider} from "../UserProvider/UserProvider";
import RequireUser from "../RequireUser/RequireUser";

function App() {

    return (
        <UserProvider>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="local" element={<Connect4Local/>} />
                <Route path="signup" element={<Signup />} />
                <Route path="lobby" element={<RequireUser> <Connect4Multiplayer /></RequireUser> } />
            </Routes>
        </UserProvider>
    );
}

export default App;
