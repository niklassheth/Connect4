import "./Chip.css";

// chip color can be whitesmoke, red, or yellow
type ChipProps = {
    row?: number,
    color?: string,
}

function Chip(props: ChipProps) {
    // set an in-line style of whitesmoke if the props.color prop is some falsy value
    let s = { backgroundColor: props.color ? props.color : "whitesmoke" };

    return <div className="Chip" data-row={props.row} style={s}></div>;
}

export default Chip;
