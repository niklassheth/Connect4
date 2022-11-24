import './Board.css';
import Column from "../Column/Column";
import Chip from "../Chip/Chip";

type Color = "red" | "yellow";
type ChipState = Color | "white";

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
        let board: ChipState[][] = Array(props.cols).fill('').map(() => Array(props.rows).fill("white"));
        const colors: Color[] = [initialColor, initialColor == "red" ? "yellow" : "red"];
        moves.forEach(move => {
            let col = board[move.col];
            col[col.lastIndexOf('white')] = colors[move.num % 2];
        });
        return board;
    }

    function handlePlaced(tar: EventTarget & Element) {
        const col = parseInt(tar.getAttribute('data-col'));
        if (props.moves.filter(m => m.col == col).length >= 6)
            return;
        props.clickHandler({num: props.moves.length, col: col});
    }

    return (
        <main className="Board" data-s={props.cols*props.rows} data-w={props.cols} data-h={props.rows}>
            {drawBoard(props.moves, props.initialColor).map((column, i) =>
                <Column col={i} handlePlaced={handlePlaced}>
                    {column.map((chip, j) => <Chip row={j} color={chip}/>)}
                </Column>
            )}
        </main>
    );
}

export default Board;
export type {Move};