import React from 'react';

import './Dialogs.scss';

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {addMessageActionCreator, updateMessageActionCreator} from "../../redux/state";

const Dialogs = ({state, dispatch}) => {
    let textChange = (event) => {
        dispatch(updateMessageActionCreator(event.target.value));
    }
    let buttonClick = () => {
        dispatch(addMessageActionCreator())
        dispatch(updateMessageActionCreator(''));
    }

    return (
        <div className='dialogs'>
            <div className="dialogs__list-wrapper">
                <ul className="dialogs__list">
                    {state.dialogs.map(user =>
                        <DialogItem name={user.name} id={user.id}/>
                    )}
                </ul>
            </div>
            <div className="dialogs__messages">
                <ul className="dialogs__messages-list">
                    {state.messages.map(message =>
                        <MessageItem text={message.text}/>
                    )}
                </ul>
                <div className="dialogs__messages-form">
                    <textarea value={state.messageText}
                              onChange={textChange}
                              placeholder='Введите сообщение'
                    />
                    <button onClick={buttonClick}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
