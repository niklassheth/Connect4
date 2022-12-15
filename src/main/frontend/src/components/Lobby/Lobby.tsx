import "./Lobby.css";
import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/UserProvider";
import { useLocation } from "react-router-dom";

function Lobby() {
    const [ items, setItems ] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const { sendMessage } = useWebSocket("ws://localhost:8080/lobby_socket/", {

        onMessage: (event) => {
            //console.log(event.data);
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
        //console.log(user);
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
                    location.state === "Disconnected"
                      ? <p id={"lobby-instructions"}> Other player left</p>
                      : items.length === 1
                        ? <p id={"empty-lobby"}>Currently No Players</p>
                        : <p id={"lobby-instructions"}>Click on a name below to play</p>
                }
                <button className={"button-enabled"} onClick={() => navigate("/")}>Go back</button>
                {
                    items.filter(x => x.id != user.id).map(({id, name}) => {
                        return <button key={id} onClick={handleJoinGame(id)} className="button-enabled">{name}</button>
                    })
                }
            </div>
        </div>
    );
}

export default Lobby;
