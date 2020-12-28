import React from 'react';
import {NavLink} from "react-router-dom";

import './Dialogs.scss';

const Dialogs = () => {
    return (
        <div className='dialogs'>
            <div className="dialogs__list-wrapper">
                <ul className="dialogs__list">
                    <li className="dialogs__list-item">
                        <NavLink className="dialogs__list-link" to='/dialogs/1'>Andrey</NavLink>
                    </li>
                    <li className="dialogs__list-item">
                        <NavLink className="dialogs__list-link" to='/dialogs/2'>Denis</NavLink>
                    </li>
                    <li className="dialogs__list-item">
                        <NavLink className="dialogs__list-link" to='/dialogs/3'>Ivan</NavLink>
                    </li>
                    <li className="dialogs__list-item">
                        <NavLink className="dialogs__list-link" to='/dialogs/4'>Stanislav</NavLink>
                    </li>
                </ul>
            </div>
            <div className="dialogs__messages">
                <ul className="dialogs__messages-list">
                    <li className="dialogs__messages-item">Hello!</li>
                    <li className="dialogs__messages-item">How are you?</li>
                    <li className="dialogs__messages-item">Good! And you?</li>
                </ul>
            </div>
        </div>
    );
};

export default Dialogs;
