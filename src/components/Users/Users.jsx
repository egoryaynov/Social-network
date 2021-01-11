import React from 'react';
import axios from "axios";

import {NavLink} from "react-router-dom";

import './Users.scss';
import defaultUserAvatar from '../../assets/default-user-avatar.jpg';

const Users = ({users, followToggle, setUsers}) => {
    if (users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                setUsers(response.data.items)
            })
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
                                        <img className="users__avatar"
                                             src={user.photos.small === null ? defaultUserAvatar : user.photos.small}
                                             alt={`${user.name} avatar`}/>
                                    </div>
                                </NavLink>
                                <button className="users__follow-btn" onClick={() => followToggle(user.id)}>
                                    {user.followed ? 'unfollow' : 'follow'}
                                </button>
                            </div>
                            <div className='users__description'>
                                <div className="users__description-main">
                                    <div className="users__name">{user.name}</div>
                                    <div className="users__status">{user.status}</div>
                                </div>
                                <div className="users__location">
                                    <span className="user__location-city">{'user.location.city'}</span>
                                    <span className="user__location-country">{'user.location.country'}</span>
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