import {NavLink} from "react-router-dom";
import React from "react";

import styles from './DialogsItem.module.scss';
import {DialogType} from "../../../types/types";

const DialogItem: React.FC<DialogType> = ({name, id}) => {
    const url = `/dialogs/${id}`;

    return (
        <li>
            <NavLink className={styles.link} to={url}>{name}</NavLink>
        </li>
    );
}

export default DialogItem;