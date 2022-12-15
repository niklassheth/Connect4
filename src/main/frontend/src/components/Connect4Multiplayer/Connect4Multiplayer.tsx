import "./Connect4Multiplayer.css";
import Board, { Color } from "../Board/Board";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import type { Move } from "../Board/Board";
import { useUser } from "../UserProvider/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";

function Connect4Multiplayer() {
  let cols = 7, rows = 6, initialColor: Color = "red";

  const { user } = useUser();
  const [ moves, setMoves ] = useState<Move[]>([]);
  const [ over, setOver ] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { sendMessage } = useWebSocket("ws://localhost:8080/socket_connection/" + location.state.id, {

    onMessage: (event) => {
      let data = JSON.parse(event.data);

      if (data === "CLOSE") {
          navigate("/lobby", { state: "Disconnected" });
      }

      //let moves = JSON.parse(event.data);
      //console.log(data);
      if (data instanceof Array) {
        setMoves(data);
      }
    },

  });

  useEffect(() => setOver(isConnect4() || moves.length === cols * rows), [ moves ]);

  function isConnect4() {
    let board = Array(cols).fill("").map(() => Array(rows).fill(""));

    moves.forEach(move => {
      let col = board[move.col];
      col[col.lastIndexOf("")] = move.num % 2 === 0 ? "red" : "yellow";
    });

    let color = moves.length % 2 === 0 ? "yellow" : "red";

    // horizontal
    for (let col = 0; col < board.length - 3 ; ++col) {
      for (let row = 0; row < board[0].length; ++row) {
        if (board[col][row] === color && board[col+1][row] === color && board[col+2][row] === color && board[col+3][row] === color) {
          return true;
        }
      }
    }

    // vertical
    for (let row = 0; row < board.length - 3 ; ++row) {
      for (let col = 0; col < board[0].length; ++col) {
        if (board[col][row] === color && board[col][row+1] === color && board[col][row+2] === color && board[col][row+3] === color) {
          return true;
        }
      }
    }

    // ascending diagonal
    for (let col = 3; col < board.length; ++col) {
        for (let row = 0; row < board[0].length - 3; ++row) {
            if (board[col][row] === color && board[col-1][row+1] === color && board[col-2][row+2] === color && board[col-3][row+3] === color) {
                return true;
            }
        }
    }

    // descending diagonal
    for (let col = 3; col < board.length; ++col) {
      for (let row = 3; row < board[0].length; ++row) {
        if (board[col][row] === color && board[col-1][row-1] === color && board[col-2][row-2] === color && board[col-3][row-3] === color) {
          return true;
        }
      }
    }

    return false;
  }

  const handleMove = (move: Move): void => {
    if (moves.length % 2 === location.state.moveOrder) {
      sendMessage(JSON.stringify(move));
    }
  }

  if (over) {
    return (
      <div className="Connect4Local">
        {
          !isConnect4() && moves.length === cols * rows
            ? <p id={"Over"}>Draw</p>
            : <p id={"Over"}>You {moves.length % 2 !== location.state.moveOrder ? "Win" : "Lose"}!</p>
        }
        <Board cols={cols} rows={rows} moves={moves} initialColor={initialColor} clickHandler={()=>{}}></Board>
        <div className={"game-buttons"}>
          <button className={"button-enabled"} onClick={() => navigate("/")}>Leave</button>
          <button className={"button-enabled"} onClick={() => navigate("/lobby") }>Play again?</button>
        </div>
      </div>
    );
  }
  // <p>{JSON.stringify(user)}</p>
  return (
    <div className="Connect4Multiplayer">
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
        <button className={"button-enabled"} onClick={() => navigate("/")}>Leave</button>
      </div>
    </div>
  );
}

export default Connect4Multiplayer;
