import React from 'react';

import './Dialogs.scss';

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Redirect} from "react-router-dom";

const Dialogs = ({state, changeMessage, buttonClick, isAuth}) => {
    let onChange = (event) => {
        changeMessage(event.target.value);
    }
    let onButtonClick = () => {
        buttonClick();
    }

    if (!isAuth) return <Redirect to='/login'/>
    
    return (
        <div className='dialogs'>
            <div className="dialogs__list-wrapper">
                <ul className="dialogs__list">
                    {state.dialogs.map(user =>
                        <DialogItem key={user.id} name={user.name} id={user.id}/>
                    )}
                </ul>
            </div>
            <div className="dialogs__messages">
                <ul className="dialogs__messages-list">
                    {state.messages.map(message =>
                        <MessageItem key={message.id} text={message.text}/>
                    )}
                </ul>
                <div className="dialogs__messages-form">
                    <textarea value={state.messageText}
                              onChange={onChange}
                              placeholder='Введите сообщение'
                    />
                    <button onClick={onButtonClick}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
