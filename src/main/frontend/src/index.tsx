import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Connect4 from './components/Connect4/Connect4';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
  createRoutesFromElements(
    //this doesn't seem correct; Landing page should be the top Route but the children weren't rendering so...
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/local" element={<Connect4 />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
