import "./Connect4Local.css";
import Board from "../Board/Board";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import type { Move, Color } from "../Board/Board";

/*
function isConnect4(board: ChipState[][], moves: Move[]) {
    let color = moves.length % 2 === 0 ? "red" : "yellow";

    // horizontal
    for (let col = 0; col < board.length - 3 ; ++col) {
        for (let row = 0; row < board[0].length; ++row) {
            if (board[col][row] === color && board[col+1][row] === color && board[col+2][row] === color && board[col+3][row] === color) {
                return true;
            }
        }
    }

    // vertical=
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
*/

function Connect4Local() {
  let cols = 7, rows = 6, initialColor: Color = "red";

  const [ moves, setMoves ] = useState<Move[]>([]);
  const [ over, setOver ] = useState(false);
  const navigate = useNavigate();

  function isConnect4() {
    let board = Array(7).fill("").map(() => Array(6).fill(""));

    moves.forEach(move => {
      let col = board[move.col];
      col[col.lastIndexOf("")] = move.num % 2 === 0 ? "red" : "yellow";
    });

    let color = moves.length % 2 === 0 ? "yellow" : "red";

    // horizontal
    for (let col = 0; col < board.length - 3 ; ++col) {
      for (let row = 0; row < board[0].length; ++row) {
        if (board[col][row] === color && board[col+1][row] === color && board[col+2][row] === color && board[col+3][row] === color) {return true;
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
    setMoves([ ...moves, move ]);
    //setOver(isConnect4());
  };

  // ok somehow this fixed it, let's gooo
  useEffect(() => setOver(isConnect4() || moves.length === cols * rows), [ moves ]);

  /*
  //this does not fix it either
  useEffect(() => {
      console.log(moves);
      // creates a 2D array and fills the inner arrays with "white chips"
      let board: ChipState[][] = Array(cols).fill("").map(() => Array(rows).fill("whitesmoke"));
      const colors: Color[] = [ initialColor, initialColor === "red" ? "yellow" : "red" ];

      moves.forEach(move => {
          let col = board[move.col];
          col[col.lastIndexOf("whitesmoke")] = colors[move.num % 2];
      });

      setOver(isConnect4(board, moves));
  }, [ moves ]);
  */

  if (over) {
    return (
      <div className="Connect4Local">
        {
          moves.length === cols * rows
            ? <p id={"Over"}>Draw</p>
            : <p id={"Over"}>{moves.length % 2 !== 0 ? "Red" : "Yellow"} Wins!</p>
        }
        <Board cols={cols} rows={rows} moves={moves} initialColor={initialColor} clickHandler={()=>{}}></Board>
        <div className={"game-buttons"}>
          <button className={"button-enabled"} onClick={() => navigate("/")}>Leave</button>
          <button className={"button-enabled"} onClick={() => { setMoves([]); setOver(false) }}>Play again?</button>
        </div>
      </div>
    );
  }
  return (
    <div className="Connect4Local">
      <p id={"Turn"}>Go {moves.length % 2 === 0 ? "Red" : "Yellow"}!</p>
      <Board cols={cols} rows={rows} moves={moves} initialColor={initialColor} clickHandler={handleMove}></Board>
      <div className={"game-buttons"}>
        <button className={"button-enabled"} onClick={() => navigate("/")}>Leave</button>
      </div>
    </div>
  );
}

export default Connect4Local;
