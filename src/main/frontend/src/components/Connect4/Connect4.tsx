import './Connect4.css';
import Board from '../Board/Board';
import Column from '../Column/Column';
import { useState } from 'react';

// bruh..
function findLastIndex<T>(items: T[], item: T): number {
  for (let i = items.length - 1; i >= 0; --i) {
    if (items[i] === item) {
      return i;
    }
  }
  return -1;
}

// prepare the board columns here to avoid prop drilling
function genCols(cols: number, rows: number, handler: Function, game: string[][]) {
  let board: JSX.Element[] = [];
  for (let i = 0; i < cols; ++i) {
    board.push(<Column key={`c${i}`} col={i} rows={rows} handlePlaced={handler} game={game}></Column>);
  }
  return board;
}

type C4Props = {
  moveHandler: Function,
  client: WebSocket,
};

function Connect4(props: C4Props) {
  let cols = 7, rows = 6, defColor = 'white';

  let [ game, setGame ] = useState((Array(cols).fill('').map(() => Array(rows).fill(defColor))) as string[][]);
  let [ player, setPlayer ] = useState(false);

  props.client.onmessage = ev => {
    let data = JSON.parse(ev.data);
    console.log(data);
    let chosenCol = data.columnNumber;
    setPlayer(data.moveNumber % 2 == 1);
    let changedGame = [...game];
    let chipIndex = findLastIndex<string>(changedGame[chosenCol], defColor);
    changedGame[chosenCol][chipIndex] = data.moveNumber % 2 == 1 ? 'yellow' : 'red';
    setGame(changedGame);
  }

  function handlePlaced(tar: EventTarget & Element) {
    let [ ...changedGame ] = game;
    let chosenCol = parseInt(tar.getAttribute('data-col'));
    let chipIndex = findLastIndex<string>(changedGame[chosenCol], defColor);

    if (chipIndex === -1) {
      return;
    }
    const moveCount = game.map(col => col.filter(chip => chip === "red" || chip === "yellow").length).reduce((x, y) => x + y, 0);
    props.moveHandler({moveNumber: moveCount, columnNumber: chosenCol});
    changedGame[chosenCol][chipIndex] = player ? 'yellow' : 'red';
    setGame(changedGame);
    setPlayer(!player);
  }

  // provide the board columns to the Board; Composition vs. Inheritance or something
  return (
    <div className="Connect4">
      <Board cols={cols} rows={rows}>{genCols(cols, rows, handlePlaced, game)}</Board>
    </div>
  );
}

export default Connect4;
