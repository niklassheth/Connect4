import {Outlet, Route, Routes} from 'react-router-dom';
import Landing from "../Landing/Landing";
import Connect4Local from "../Connect4Local/Connect4Local";
import Connect4Multiplayer from "../Connect4Multiplayer/Connect4Multiplayer";
import React, {useState} from "react";
import Signup from "../Signup/Signup";


function App() {
    const [user, setUser] = useState(null);

    return (
        <Routes>
            <Route index element={<Landing />} />
            <Route path="local" element={<Connect4Local/>} />
            <Route path="signup" element={<Signup setUser={setUser}/>} />
            <Route path="lobby" element={<Connect4Multiplayer />} />
        </Routes>
    );
}

export default App;