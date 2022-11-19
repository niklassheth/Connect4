import './Board.css';

type BoardProps = {
    children: JSX.Element[],
    cols: number,
    rows: number,
};

function Board(props: BoardProps) {
    return <main className="Board" data-s={props.cols*props.rows} data-w={props.cols} data-h={props.rows}>{props.children}</main>
}

export default Board;
