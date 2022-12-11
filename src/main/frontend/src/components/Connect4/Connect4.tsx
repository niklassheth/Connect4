import './Connect4.css';
import Board from '../Board/Board';
import Score from '../Score/Score';
import {useState} from "react";
import type { Move } from '../Board/Board'

function Connect4() {

  const [moves, setMoves] = useState<Move[]>([]);

  const handleMove = (move: Move): void => setMoves([...moves, move]);

  return (
    <div className="Connect4">
      <Score names={[ "Player 1", "Player 2" ]} scores={[ 0, 0 ]}></Score>
      <Board cols={7} rows={6} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>
    </div>
  );
}

export default Connect4;
