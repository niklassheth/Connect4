import './Connect4.css';
import Board from '../Board/Board';
import {useEffect, useState} from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import type { Move } from '../Board/Board'
import type WebSocketEventMap from 'react-use-websocket';

function Connect4() {

  const { sendMessage } = useWebSocket("ws://localhost:8080/connection/1", {
    onMessage: (event) => {
      let moves = JSON.parse(event.data);
      console.log(moves);
      setMoves(moves);
    }
  });
  const [moves, setMoves] = useState<Move[]>([]);
  const handleMove = (move: Move): void => {
    console.log(move)
    sendMessage(JSON.stringify(move));
  };

  return (
    <div className="Connect4">
      <p>Which players turn?</p>
      <Board cols={7} rows={6} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>
      <p>Each players wins?</p>
    </div>
  );
}

export default Connect4;
