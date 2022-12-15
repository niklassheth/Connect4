import "./Lobby.css";
import React, {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider/UserProvider";

function Lobby() {
    const [items, setItems] = useState([]);
    const {user} = useUser();
    const navigate = useNavigate();
    const { sendMessage } = useWebSocket("ws://localhost:8080/lobby_socket/", {
        onMessage: (event) => {
            console.log(event.data);
            const data = JSON.parse(event.data);
            if (data instanceof Array) {
                //lobby data
                setItems(data);
            }
            else {
                navigate("/multiplayer", {state: data})
            }
        }
    });
    useEffect(() => {
        console.log(user);
        sendMessage(JSON.stringify(user));
    },[]);

    const handleJoinGame = id => async () => {
        const response = await fetch("http://localhost:8080/connection?" + new URLSearchParams({
            thisId: user.id,
            otherId: id
        }), {
            method: "POST"
        });
    }

    return (
        <div id="Lobby">
            <div id="lobby-browser">
                {
                    items.length == 1 ? <p style={{color: "white"}}>No Players</p> : <></>
                }
                {items.filter(x => x.id != user.id).map(({id, name}) => <button key={id} onClick={handleJoinGame(id)} className="button-enabled" style={{width:"100%"}}>{name}</button>)}
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default Lobby;
