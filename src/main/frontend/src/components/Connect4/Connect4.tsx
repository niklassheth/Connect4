import './Connect4.css';
import Board from '../Board/Board';
import Column from '../Column/Column';


type Color = "red" | "yellow";

type ChipState = Color | "white";

type Move = {
  moveNumber: number,
  columnNumber: number,
}

type Connect4Props = {
  moves: Move[],
  initialColor: Color,
  clickHandler: (move: Move) => void,
}

const cols = 7;
const rows = 6;


// prepare the board columns here to avoid prop drilling
function genCols(cols: number, rows: number, handler: Function, game: ChipState[][]) {
  let board: JSX.Element[] = [];
  for (let i = 0; i < cols; ++i) {
    board.push(<Column key={`c${i}`} col={i} rows={rows} handlePlaced={handler} game={game}></Column>);
  }
  return board;
}

function drawBoard(moves: Move[], initialColor: Color) : ChipState[][] {
  let board: ChipState[][] = (Array(cols).fill('').map(() => Array(rows).fill("white")));
  const colors: Color[] = [initialColor, initialColor == "red" ? "yellow" : "red"];
  for (const move of moves) {
    board[move.columnNumber][board[move.columnNumber].lastIndexOf("white")] = colors[move.moveNumber % 2];
  }
  return board;
}

function Connect4(props: Connect4Props) {

  function handlePlaced(tar: EventTarget & Element) {
    const col = parseInt(tar.getAttribute('data-col'));
    if (props.moves.filter(m => m.columnNumber == col).length >= 6)
        return;
    props.clickHandler({moveNumber: props.moves.length, columnNumber: col});
  }

  // provide the board columns to the Board; Composition vs. Inheritance or something
  return (
    <div className="Connect4">
      <Board cols={cols} rows={rows}>{genCols(cols, rows, handlePlaced, drawBoard(props.moves, props.initialColor))}</Board>
    </div>
  );
}

export default Connect4;
export type { Move };
