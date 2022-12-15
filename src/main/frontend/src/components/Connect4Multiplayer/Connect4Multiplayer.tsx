import "./Connect4Multiplayer.css";
import Board from "../Board/Board";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import type { Move } from "../Board/Board";
import { useUser } from "../UserProvider/UserProvider";
import Score from "../Score/Score";
import {useLocation} from "react-router-dom";

function Connect4Multiplayer() {
  const { user } = useUser();
  const [ moves, setMoves ] = useState<Move[]>([]);
  const location = useLocation();
  const { sendMessage } = useWebSocket("ws://localhost:8080/socket_connection/" + location.state.id, {
    onMessage: (event) => {
      let data = JSON.parse(event.data);
      //let moves = JSON.parse(event.data);
      console.log(data);
      if (data instanceof Object) {
        setMoves(data);
      }
    },
  });

  const handleMove = (move: Move): void => {
      if (moves.length % 2 == location.state.moveOrder)
        sendMessage(JSON.stringify(move));
    }

  return (
    <div className="Connect4">
      <p>{JSON.stringify(user)}</p>
      <Board cols={7} rows={6} moves={moves} initialColor="red" clickHandler={handleMove}></Board>
    </div>
  );
}

export default Connect4Multiplayer;
