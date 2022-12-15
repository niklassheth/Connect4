import "./Signup.css";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/UserProvider";

function Signup() {

    // these first 2 states are mainly for doing some basic input validation
    let [ name, setName ] = useState("");
    const valid = name != "";

    // newUser will be used to send a valid username to the server and assign them a unique object to
    // put in the browsers local storage
    const { /*user,*/ newUser } = useUser();

    // for redirecting
    const navigate = useNavigate();

    // as a user types in their name, the input will be validated
    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {

        // trim HTML input for some basic validation
        let input = ev.target.value.trim();


        setName(input);

    }

    const handleSignup = async () => {
        if (valid) {
            // will send the users name to the server and wait for a response
            await newUser(name);

            // once a response is received and the user is created, send them to the lobby
            navigate("/lobby");
        }
    }

    function handleEnter(ev) {
        //if (ev.key)
        console.log(ev.keyCode);
    }

    return (
        <div id="Signup">
            <div>
                <label htmlFor="username">What is your name?</label>
                <input type="text" id="uid" name="username" placeholder="Name" onChange={handleInput} autoComplete={"off"} autoFocus={true}></input>
                <button
                onClick={handleSignup}
                onKeyPress={handleEnter}
                type="submit"
                className={valid ? "button-enabled" : "button-disabled"}
                disabled={!valid}
                style={valid ? { backgroundColor: "rgb(0, 31, 206)" } : {} }
                >
                    Continue
                </button>
            </div>
            <button className={"button-enabled"} style={{backgroundColor: "dodgerblue"}} onClick={() => navigate("/")}>Go back</button>
        </div>
    );
}

export default Signup;
