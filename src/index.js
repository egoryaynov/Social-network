import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';

let dataPosts = [
    {id: 1, message: 'It is post number 1', likesCount: '0'},
    {id: 2, message: 'It is post number 2', likesCount: '10'},
    {id: 3, message: 'It is post number 3', likesCount: '24'},
    {id: 4, message: 'It is post number 4', likesCount: '2'},
    {id: 5, message: 'It is post number 5', likesCount: '55'},
];
let dataDialogs = [
    {id: 1, name: 'Andrey'},
    {id: 2, name: 'Denis'},
    {id: 3, name: 'Ivan'},
    {id: 4, name: 'Stanislav'},
];
let dataMessages = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'How are you?'},
    {id: 3, text: 'Good! And you?'},
];

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

export {dataPosts, dataMessages, dataDialogs};