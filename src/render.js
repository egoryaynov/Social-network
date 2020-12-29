import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import App from './App';

export let rerenderApp = (state, addPost, updatePostText) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updatePostText={updatePostText}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
