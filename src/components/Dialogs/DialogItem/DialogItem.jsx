import {NavLink} from "react-router-dom";
import React from "react";

import './DialogsItem.scss';

const DialogItem = ({name, id}) => {
    const url = `/dialogs/${id}`;

    return (
        <li className="dialogs__list-item">
            <NavLink className="dialogs__list-link" to={url}>{name}</NavLink>
        </li>
    );
}

export default DialogItem;