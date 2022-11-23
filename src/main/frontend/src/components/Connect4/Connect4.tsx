import './Connect4.css';
import Board from '../Board/Board';
import {useState} from "react";
import type { Move } from '../Board/Board'

function Connect4() {

  const [moves, setMoves] = useState<Move[]>([]);

  const handleMove = (move: Move): void => setMoves([...moves, move]);

  return <Board cols={6} rows={7} moves={moves} initialColor={"red"} clickHandler={handleMove}></Board>
}

export default Connect4;
