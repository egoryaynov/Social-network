import React from 'react';
import Dialogs from "./Dialogs";

import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/dialogsReducer";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState();

                const changeMessage = (text) => {
                    store.dispatch(updateMessageActionCreator(text));
                };
                const buttonClick = () => {
                    store.dispatch(addMessageActionCreator())
                    store.dispatch(updateMessageActionCreator(''));
                };

                return (
                    <Dialogs state={state.dialogsPage}
                             changeMessage={changeMessage}
                             buttonClick={buttonClick}/>
                );
            }}
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;
