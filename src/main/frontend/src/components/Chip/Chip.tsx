import './Chip.css';

type ChipProps = {
    row: number,
    color?: string,
}

function Chip(props: ChipProps) {
    let s = { backgroundColor: props.color ? props.color : "white" };
    return <div className="Chip" data-row={props.row} style={s}></div>;
}

export default Chip;