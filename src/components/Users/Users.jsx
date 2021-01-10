import React from 'react';
import {NavLink} from "react-router-dom";

import './Users.scss';

const Users = ({users, followToggle, setUsers}) => {
    const onButtonClick = (userID) => {
        followToggle(userID)
    }

    return (
        <div className='users'>
            <ul className="users__list">
                {users.map(user => {
                    return (
                        <li className='users__item'>
                            <div>
                                <NavLink to={`/users/${user.id}`}>
                                    <div className="users__img-wrapper">
                                        <img className="users__avatar" src={user.avatar}
                                             alt={`${user.fullName} avatar`}/>
                                    </div>
                                </NavLink>
                                <button className="users__follow-btn" onClick={onButtonClick.bind(null, user.id)}>
                                    {user.followed ? 'unfollow' : 'follow'}
                                </button>
                            </div>
                            <div className='users__description'>
                                <div className="users__description-main">
                                    <div className="users__name">{user.fullName}</div>
                                    <div className="users__status">{user.status}</div>
                                </div>
                                <div className="users__location">
                                    <span className="user__location-city">{user.location.city}</span>
                                    <span className="user__location-country">{user.location.country}</span>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Users;