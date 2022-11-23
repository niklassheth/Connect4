import './Column.css';
import {memo, PropsWithChildren, SyntheticEvent} from 'react';

type ColumnProps = {
    col: number,
    handlePlaced: Function,
}

function Column(props: PropsWithChildren<ColumnProps>) {

    function handlePlaced(ev: SyntheticEvent) {
        props.handlePlaced(ev.currentTarget);
    }

    return <section className="Column" data-col={props.col} onClick={handlePlaced}>{props.children}</section>;
}

export default memo(Column);
