import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Connect4 from './components/Connect4Multiplayer/Connect4Multiplayer';
import reportWebVitals from './reportWebVitals';
import Connect4Local from "./components/Connect4Local/Connect4Local";
import App from "./components/App/App";
import Connect4Multiplayer from "./components/Connect4Multiplayer/Connect4Multiplayer";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
