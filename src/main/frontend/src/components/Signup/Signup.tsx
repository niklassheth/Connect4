import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";

function Signup() {
    let [name, setName] = useState("");
    const {user, newUser} = useUser();
    const navigate = useNavigate();

    const handleSignup = async () => {
        await newUser(name);
        navigate("/lobby");
    }
    return (
        <>
            <h1>Enter your Name:</h1>
            <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
            <button onClick={handleSignup}>Done</button>
        </>
    )
}

export default Signup;