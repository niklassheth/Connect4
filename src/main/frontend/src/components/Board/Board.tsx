import "./Board.css";
import Column from "../Column/Column";
import Chip from "../Chip/Chip";

type Color = "red" | "yellow";
type ChipState = Color | "whitesmoke";

type Move = {
    num: number,
    col: number,
}

type BoardProps = {
    cols: number,
    rows: number,
    moves: Move[],
    initialColor: Color,
    clickHandler: (move: Move) => void,
}

function Board(props: BoardProps) {
    function drawBoard(moves: Move[], initialColor: Color) : ChipState[][] {
        // creates a 2D array and fills the inner arrays with "white chips"
        let board: ChipState[][] = Array(props.cols).fill("").map(() => Array(props.rows).fill("whitesmoke"));

        const colors: Color[] = [ initialColor, initialColor === "red" ? "yellow" : "red" ];

        // moves is coming in from the server; for each move, set the correct color
        // the initial color will be the evens, the other color will be the odds
        moves.forEach(move => {
            let col = board[move.col];
            col[col.lastIndexOf("whitesmoke")] = colors[move.num % 2];
        });

        return board;
    }

    function handlePlaced(tar: EventTarget & Element) {
        const col = parseInt(tar.getAttribute("data-col"));

        if (props.moves.filter(m => m.col === col).length >= 6) {
            return;
        }

        props.clickHandler({num: props.moves.length, col: col});
    }

    return (
        <main className="Board" data-s={props.cols*props.rows} data-w={props.cols} data-h={props.rows}>
            {
                drawBoard(props.moves, props.initialColor).map((column, i) =>
                    <Column key={`c${i}`} col={i} handlePlaced={handlePlaced}>
                        {column.map((chip, j) => <Chip key={`c${i}r${j}`} row={j} color={chip} />)}
                    </Column>
                )
            }
        </main>
    );
}

export default Board;
export type { Move, Color };
