import './Column.css';
import Chip from '../Chip/Chip';
import { SyntheticEvent } from 'react';

type ColumnProps = {
    col: number,
    rows: number,
    handlePlaced: Function,
    game: string[][],
}

function Column(props: ColumnProps) {
    let chips: JSX.Element[] = [];
    props.game[props.col].map((color, i) => chips.push(<Chip key={`c${props.col}r${i}`} row={i} color={color}></Chip>));

    function handlePlaced(ev: SyntheticEvent) {
        props.handlePlaced(ev.currentTarget);
    }

    return <section className="Column" data-col={props.col} onClick={handlePlaced}>{chips}</section>;
}

export default Column;
