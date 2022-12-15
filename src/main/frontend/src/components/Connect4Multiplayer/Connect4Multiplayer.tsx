import "./Connect4Multiplayer.css";
import Board, {Color} from "../Board/Board";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import type { Move } from "../Board/Board";
import { useUser } from "../UserProvider/UserProvider";
import Score from "../Score/Score";
import {useLocation, useNavigate} from "react-router-dom";

function Connect4Multiplayer() {
  let cols = 7, rows = 6, initialColor: Color = "red";

  const { user } = useUser();
  const [ moves, setMoves ] = useState<Move[]>([]);
  //const [ over, setOver ] = useState

  const location = useLocation();
  const navigate = useNavigate();

  const { sendMessage } = useWebSocket("ws://localhost:8080/socket_connection/" + location.state.id, {
    onMessage: (event) => {
      let data = JSON.parse(event.data);
      if (data === "CLOSE") {
          navigate("/", {state: "Disconnected"});
      }
      //let moves = JSON.parse(event.data);
      console.log(data);
      if (data instanceof Array) {
        setMoves(data);
      }
    },
  });

  const handleMove = (move: Move): void => {
      if (moves.length % 2 === location.state.moveOrder)
        sendMessage(JSON.stringify(move));
    }

  return (
    <div className="Connect4Multiplayer">
      <p>{JSON.stringify(user)}</p>
      <p id={"Turn"}>
        {
          moves.length % 2 === location.state.moveOrder
            ? "Your "
            : location.state.moveOrder
              ? "Reds "
              : "Yellows "
        }
        Turn!
      </p>
      <Board cols={cols} rows={rows} moves={moves} initialColor={initialColor} clickHandler={handleMove}></Board>
      <div className={"game-buttons"}>
      </div>
    </div>
  );
}

export default Connect4Multiplayer;
