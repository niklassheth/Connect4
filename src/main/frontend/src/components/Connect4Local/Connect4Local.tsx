import './Connect4Local.css';
import Board from '../Board/Board';
import {useEffect, useState} from "react";
import type { Move } from '../Board/Board'

function Connect4Local() {

  const [moves, setMoves] = useState<Move[]>([]);
  const handleMove = (move: Move): void => {
    setMoves([...moves, move]);
  };

  return (
    <div className="Connect4Local">
      <Board cols={7} rows={6} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>
    </div>
  );
}

export default Connect4Local;
