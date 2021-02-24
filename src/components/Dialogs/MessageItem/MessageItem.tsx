import React from 'react';
import {MessageType} from "../../../types/types";

const MessageItem: React.FC<MessageType> = ({text, id}) => {
    return (
        <li>{text}</li>
    );
};

export default MessageItem;
