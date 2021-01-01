import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import './index.scss';

//import store from "./redux/store";
import App from "./App";

import store from './redux/redux-store';

let rerenderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App store={store}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderApp();

store.subscribe(rerenderApp);