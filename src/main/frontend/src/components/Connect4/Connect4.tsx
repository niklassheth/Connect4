import './Connect4.css';
import Board from '../Board/Board';
import {useState} from "react";
import type { Move } from '../Board/Board'

function Connect4() {

  const [moves, setMoves] = useState<Move[]>([]);

  const handleMove = (move: Move): void => setMoves([...moves, move]);

  return (
    <div className="Connect4">
      <p>Which players turn?</p>
      <Board cols={7} rows={6} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>
      <p>Each players wins?</p>
    </div>
  );
}

export default Connect4;
