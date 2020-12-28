import React from 'react';

import './Dialogs.scss';

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = ({dataDialogs, dataMessages}) => {
    return (
        <div className='dialogs'>
            <div className="dialogs__list-wrapper">
                <ul className="dialogs__list">
                    {dataDialogs.map(user => <DialogItem name={user.name} id={user.id}/>)}
                </ul>
            </div>
            <div className="dialogs__messages">
                <ul className="dialogs__messages-list">
                    {dataMessages.map(message => <MessageItem text={message.text}/>)}
                </ul>
            </div>
        </div>
    );
};

export default Dialogs;
