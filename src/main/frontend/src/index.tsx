import React from 'react';
import ReactDOM from 'react-dom/client';
import Connect4Multiplayer from "./components/Connect4Multiplayer/Connect4Multiplayer";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

/*
const id = prompt("Enter your id")

const address = "ws:localhost:8080/connection/"+ id;
const client = new WebSocket(address);

client.onopen = () => {
    console.log("Connected :)");
    client.send("HI!");
}

const fn = moveData => {
    console.log(moveData);
    client.send(JSON.stringify(moveData));
};
*/

root.render(
  <React.StrictMode>
    <Connect4Multiplayer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
