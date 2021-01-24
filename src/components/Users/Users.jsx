import React from 'react';

import './Users.scss';
import {NavLink} from "react-router-dom";

import defaultUserAvatar from "../../assets/default-user-avatar.jpg";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";

const Users = ({
                   users, totalUsersCount, pageSize, currentPage,
                   onChangePage, isFollowsFetching, isFetching, onFollowUser
               }) => {
    let onFollow = (userID, isFollow) => {
        onFollowUser(userID, isFollow)
    }

    return (
        <div className='users'>
            <Paginator page={currentPage}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       onChangePage={onChangePage}
                       currentPage={currentPage}
            />
            {isFetching ? <Preloader/> : null}

            <div className={isFetching ? "users__wrapper hide" : 'users__wrapper'}>
                <ul className="users__list">
                    {users.map(user => {
                        return (
                            <li key={user.id} className='users__item'>
                                <div>
                                    <NavLink to={`/profile/${user.id}`}>
                                        <div className="users__img-wrapper">
                                            <img className="users__avatar"
                                                 src={user.photos.small === null ? defaultUserAvatar : user.photos.small}
                                                 alt={`${user.name} avatar`}/>
                                        </div>
                                    </NavLink>
                                    <button disabled={isFollowsFetching.some(id => id === user.id)}
                                            className="users__follow-btn"
                                            onClick={() => onFollow(user.id, user.followed)}>
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
        </div>
    )
};

export default Users;
