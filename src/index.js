import React from 'react';
import './index.scss';

import state, {addMessage, addPost, subscribe, updateMessage, updatePostText} from "./redux/state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

export let rerenderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updatePostText={updatePostText}
                     addMessage={addMessage} updateMessage={updateMessage}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderApp();

subscribe(rerenderApp);