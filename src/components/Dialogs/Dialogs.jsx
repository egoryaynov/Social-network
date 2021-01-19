import React from 'react';

import './Dialogs.scss';

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import DialogsForm from "./DialogsForm/DialogsForm";

const Dialogs = ({state, addMessage}) => {
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

                <DialogsForm addMessage={addMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;
