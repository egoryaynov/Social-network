import React from 'react';

import './Users.scss';
import {NavLink} from "react-router-dom";

import defaultUserAvatar from "../../assets/default-user-avatar.jpg";

const Users = ({users, totalUsersCount, pageSize, currentPage, onChangePage, followToggle}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= 30; i++) {
        pages.push(i)
    }

    return (
        <div className='users'>
            <div className="users__pagination pagination">
                {pages.map((page) => (
                    <span
                        className={currentPage === page
                            ? 'pagination__item pagination__item--active'
                            : 'pagination__item'}
                        onClick={() => onChangePage(page)}>{page}</span>
                ))}
            </div>

            <ul className="users__list">
                {users.map(user => {
                    return (
                        <li key={user.id} className='users__item'>
                            <div>
                                <NavLink to={`/users/${user.id}`}>
                                    <div className="users__img-wrapper">
                                        <img className="users__avatar"
                                             src={user.photos.small === null ? defaultUserAvatar : user.photos.small}
                                             alt={`${user.name} avatar`}/>
                                    </div>
                                </NavLink>
                                <button className="users__follow-btn"
                                        onClick={() => followToggle(user.id)}>
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
    )
};

export default Users;
