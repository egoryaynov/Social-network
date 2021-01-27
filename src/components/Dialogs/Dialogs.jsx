import React from 'react';

import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import DialogsForm from "./DialogsForm/DialogsForm";

import styles from './Dialogs.module.scss';

const Dialogs = ({dialogs, messages, addMessage}) => {
    return (
        <div className={styles.dialogs}>
            <div>
                <ul>
                    {dialogs.map(user =>
                        <DialogItem key={user.id} name={user.name} id={user.id}/>
                    )}
                </ul>
            </div>
            <div>
                <ul>
                    {messages.map(message =>
                        <MessageItem key={message.id} text={message.text}/>
                    )}
                </ul>

                <DialogsForm addMessage={addMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;
