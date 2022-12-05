import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup({setUser}) {
    let [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await fetch('http://localhost:8080/player', {method: 'POST', body: JSON.stringify({name}), headers: {'Content-Type': 'application/json'}}).then(x => x.json());
        console.log(response);
        setUser(response);
        navigate("/local");
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