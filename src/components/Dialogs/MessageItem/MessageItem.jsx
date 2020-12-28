import React from 'react';

const MessageItem = ({text}) => {
    return (
        <li className="dialogs__messages-item">{text}</li>
    );
};

export default MessageItem;
