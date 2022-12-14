import "./Connect4Multiplayer.css";
import Board from "../Board/Board";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import type { Move } from "../Board/Board";
import { useUser } from "../UserProvider/UserProvider";
import Score from "../Score/Score";

function Connect4Multiplayer() {
  const { user } = useUser();
  const [ moves, setMoves ] = useState<Move[]>([]);
  const [ isTurn, setIsTurn ] = useState<boolean>();
  const [ score, setScore ] = useState(0);
  const [ over, setOver ] = useState(false);

  const { sendMessage } = useWebSocket("ws://localhost:8080/connection/1", {
    onMessage: (event) => {
      let data = JSON.parse(event.data);
      //let moves = JSON.parse(event.data);
      console.log(data);
      if (data === true || data === false) {
        setIsTurn(data);
      }
      else if (data instanceof Object) {
        setMoves(data);
      }
    },
  });

  const handleMove = (move: Move): void => {
    console.log("Is it this player's turn?", isTurn);
    if (isTurn) {
      console.log("CLIENT sending move:", move);
      sendMessage(JSON.stringify(move));

      //i dont think client should be modifying the setIsTurn state
      //but this is here just to possibly handle multiple clicks
      setIsTurn(false);
    }
  };

  return (
    <div className="Connect4">
      <p>{JSON.stringify(user)}</p>
      <Board cols={7} rows={6} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>

    </div>
  );
}

export default Connect4Multiplayer;
