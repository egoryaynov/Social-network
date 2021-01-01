import React from 'react';

import './Dialogs.scss';

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = ({state, changeMessage, buttonClick}) => {
    let onChange = (event) => {
        changeMessage(event.target.value);
    }
    let onButtonClick = () => {
        buttonClick();
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
