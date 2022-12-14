import "./Column.css";
import { memo, PropsWithChildren, SyntheticEvent } from "react";

type ColumnProps = {
    col: number,
    handlePlaced: Function,
}

function Column(props: PropsWithChildren<ColumnProps>) {

    // calls the handlePlaced passed down by the Board component; lets Board know what column a player wants to place
    // their piece in
    function handlePlaced(ev: SyntheticEvent) {
        props.handlePlaced(ev.currentTarget);
    }

    return <section className="Column" data-col={props.col} onClick={handlePlaced}>{props.children}</section>;
}

// memo is a method that stops the provided component from re-rendering unnecessarily
export default memo(Column);
