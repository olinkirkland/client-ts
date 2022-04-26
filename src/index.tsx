import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/general.css';
import './assets/css/styles.css';
import './assets/css/queries.css';
import { PopupProvider } from 'react-popup-manager';

export const rootElement = document.getElementById('root');

function Main() {
  return (
    <React.StrictMode>
      <PopupProvider>
        <App />
      </PopupProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(Main(), rootElement);
