import './Board.css';
import Column from "../Column/Column";
import Chip from "../Chip/Chip";

type Color = "red" | "yellow";

type ChipState = Color | "white";

type Move = {
    moveNumber: number,
    columnNumber: number,
}

type BoardProps = {
    cols: number,
    rows: number,
    moves: Move[],
    initialColor: Color,
    clickHandler: (move: Move) => void,
}

const cols = 7;
const rows = 6;

function drawBoard(moves: Move[], initialColor: Color) : ChipState[][] {
    let board: ChipState[][] = (Array(cols).fill('').map(() => Array(rows).fill("white")));
    const colors: Color[] = [initialColor, initialColor == "red" ? "yellow" : "red"];
    for (const move of moves) {
        board[move.columnNumber][board[move.columnNumber].lastIndexOf("white")] = colors[move.moveNumber % 2];
    }
    return board;
}

function Board(props: BoardProps) {
    function handlePlaced(tar: EventTarget & Element) {
        const col = parseInt(tar.getAttribute('data-col'));
        if (props.moves.filter(m => m.columnNumber == col).length >= 6)
            return;
        props.clickHandler({moveNumber: props.moves.length, columnNumber: col});
    }

    return (
        <main className="Board" data-s={props.cols*props.rows} data-w={props.cols} data-h={props.rows}>
            {drawBoard(props.moves, props.initialColor).map((column, i) =>
                <Column col={i} handlePlaced={handlePlaced}>
                    {column.map((chip, j) =>
                        <Chip row={j} color={chip}/>
                    )}
                </Column>)
            }
        </main>
    );
}

export default Board;
export type {Move};