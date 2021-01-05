import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import './index.scss';

import App from "./App";

import store from './redux/redux-store';
import {Provider} from "./StoreContext";

let rerenderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderApp();

store.subscribe(rerenderApp);