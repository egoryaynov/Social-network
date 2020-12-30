import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import './index.scss';

import store from "./redux/state";
import App from "./App";

export let rerenderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={store.getState()}
                     addPost={store.addPost.bind(store)}
                     updatePostText={store.updatePostText.bind(store)}
                     addMessage={store.addMessage.bind(store)}
                     updateMessage={store.updateMessage.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderApp();

store.subscribe(rerenderApp);