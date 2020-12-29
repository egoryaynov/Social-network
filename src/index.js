import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import state from "./redux/state";

ReactDOM.render(
    <React.StrictMode>
        <App state={state}/>
    </React.StrictMode>,
    document.getElementById('root')
);