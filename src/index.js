import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap-css-only/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';
/* App is the entry point to the React code.*/
import AirApp from './components/AirApp';
/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from "react-router-dom";
//import $ from 'jquery';

/* Bootstrap imports */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

/* Custom CSS */
import './shared/css/resets.css';
import './shared/css/shared.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/airsense">
      <AirApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
