import React from 'react';
import {NavLink} from "react-router-dom";

const NavListItem = ({link, itemName}) => {
    let defaultTitle = link.substring(1, 2).toUpperCase() + link.substring(2);
    let title = itemName || defaultTitle;

    return (
        <li className="nav__item">
            <NavLink to={link} className="nav__link">{title}</NavLink>
        </li>
    );
};

export default NavListItem;
