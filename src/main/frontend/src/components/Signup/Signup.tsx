import "./Signup.css";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/UserProvider";

function Signup() {
    let [ name, setName ] = useState("");
    let [ valid, setValid ] = useState(false);
    const { user, newUser } = useUser();
    const navigate = useNavigate();

    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
        let input = ev.target.value.trim();
        setValid(input.length > 0);
        if (valid) {
            setName(input);
        }
    }

    const handleSignup = async () => {
        if (valid) {
            await newUser(name);
            navigate("/lobby");
        }
    }

    return (
        <div id="Signup">
            <div>
                <label htmlFor="username">What is your name?</label>
                <input type="text" id="uid" name="username" placeholder="Name" onChange={handleInput}></input>
                <button
                onClick={handleSignup}
                type="submit"
                className={valid ? "button-enabled" : "button-disabled"}
                disabled={!valid}
                style={valid ? { backgroundColor: "rgb(0, 31, 206)" } : {} }
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default Signup;
