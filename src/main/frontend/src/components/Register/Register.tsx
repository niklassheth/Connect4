import "./Register.css";
import { ChangeEvent, useState } from "react";

function Register() {
    let [ valid, setValid ] = useState(false);
    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => setValid(ev.target.value.trim().length > 0);

    return (
        <div id="Register">
            <form autoComplete="off">
                <label htmlFor="username">What is your name?</label>
                <input type="text" id="uid" name="username" placeholder="Name" onChange={handleInput}></input>
                <button 
                type="submit"
                className={valid ? "button-enabled" : "button-disabled"}
                disabled={!valid}
                style={valid ? { backgroundColor: "rgb(0, 31, 206)" } : {} }>
                    Continue
                </button>
            </form>
        </div>
    );
}

export default Register;
