import {NavLink} from "react-router-dom";
import React from "react";

import styles from './DialogsItem.module.scss';

const DialogItem = ({name, id}) => {
    const url = `/dialogs/${id}`;

    return (
        <li>
            <NavLink className={styles.link} to={url}>{name}</NavLink>
        </li>
    );
}

export default DialogItem;