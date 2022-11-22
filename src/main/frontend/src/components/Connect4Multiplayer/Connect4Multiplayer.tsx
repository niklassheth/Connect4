import Connect4 from "../Connect4/Connect4";
import {useState} from "react";

import type { Move } from "../Connect4/Connect4";

const Connect4Multiplayer = () => {
    const [moves, setMoves] = useState<Move[]>([]);

    const handleMove = (move: Move): void => setMoves(xs => [...xs, move]);

    return <Connect4 moves={moves} initialColor={"red"} clickHandler={handleMove}></Connect4>
}


export default Connect4Multiplayer;