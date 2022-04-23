import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/general.css';
import './assets/css/styles.css';
import './assets/css/queries.css';
import { PopupProvider } from 'react-popup-manager';

ReactDOM.render(
  <React.StrictMode>
    <PopupProvider>
      <App />
    </PopupProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
