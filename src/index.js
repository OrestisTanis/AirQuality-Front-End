import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import './shared/css/resets.css';
import './shared/css/shared.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AirApp from './components/AirApp';

ReactDOM.render(
  <React.StrictMode>
    <AirApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();