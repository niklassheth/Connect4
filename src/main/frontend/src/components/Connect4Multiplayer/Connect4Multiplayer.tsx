import './Connect4Multiplayer.css';
import Board from '../Board/Board';
import {useEffect, useState} from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import type { Move } from '../Board/Board'
import type WebSocketEventMap from 'react-use-websocket';
import {useUser} from "../UserProvider/UserProvider";

function Connect4Multiplayer() {

  const { sendMessage } = useWebSocket("ws://localhost:8080/connection/1", {
    onMessage: (event) => {
      let moves = JSON.parse(event.data);
      console.log(moves);
      setMoves(moves);
    }
  });
  const {user} = useUser();
  const [moves, setMoves] = useState<Move[]>([]);
  const handleMove = (move: Move): void => {
    console.log(move)
    sendMessage(JSON.stringify(move));
  };

  return (
    <div className="Connect4">
      <p>{JSON.stringify(user)}</p>
      <Board cols={7} rows={6} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>
    </div>
  );
}

export default Connect4Multiplayer;
