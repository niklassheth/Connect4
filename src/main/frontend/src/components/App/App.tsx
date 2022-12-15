import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../UserProvider/UserProvider";
import Landing from "../Landing/Landing";
import Connect4Local from "../Connect4Local/Connect4Local";
import Connect4Multiplayer from "../Connect4Multiplayer/Connect4Multiplayer";
import Signup from "../Signup/Signup";
import RequireUser from "../RequireUser/RequireUser";
import Lobby from "../Lobby/Lobby";

// this component is mainly for setting up all of our routes
// All of these routes have access to the user state because they are children of the UserProvider context
const App = () => (
    <UserProvider>
        <Routes>
            <Route index element={<Landing />} />
            <Route path="local" element={<Connect4Local />} />
            <Route path="signup" element={<Signup />} />
            <Route path="lobby" element={<RequireUser><Lobby /></RequireUser>} />
            <Route path="multiplayer" element={<Connect4Multiplayer />}/>
        </Routes>
    </UserProvider>
);

export default App;
