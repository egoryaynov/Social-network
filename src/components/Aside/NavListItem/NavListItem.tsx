import React from 'react';
import {NavLink} from "react-router-dom";

type PropsType = {
    link: string
    itemName?: string // Nav item title (default equals link)
}
const NavListItem: React.FC<PropsType> = ({link, itemName}) => {
    let defaultTitle: string = link[1].toUpperCase() + link.substring(2);
    let title: string = itemName || defaultTitle;

    return (
        <li className="nav__item">
            <NavLink to={link} className="nav__link">{title}</NavLink>
        </li>
    );
};

export default NavListItem;
