import React from 'react';
import {NavLink} from "react-router-dom";

import defaultUserAvatar from "../../assets/default-user-avatar.jpg";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";

import styles from './Users.module.scss';

import {UserType} from "../../types/types";

type PropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    pagesToShow: number
    isFollowsFetching: Array<number>
    isFetching: boolean

    onFollowUser: (userID: number, isFollow: boolean) => void
    onChangePage: (pageNumber: number) => void
}
const Users: React.FC<PropsType> = ({
                                        users, totalUsersCount, pageSize, currentPage,
                                        onChangePage, isFollowsFetching, isFetching, onFollowUser,
                                        pagesToShow
                                    }) => {
    let onFollow = (userID: number, isFollow: boolean) => {
        onFollowUser(userID, isFollow)
    }

    return (
        <div>
            <Paginator className={isFetching ? "hide" : ''}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       onChangePage={onChangePage}
                       currentPage={currentPage}
                       pagesToShow={pagesToShow}
            />
            {isFetching ? <Preloader/> : null}

            <div className={isFetching ? "hide" : ''}>
                <ul>
                    {users.map(user => {
                        return (
                            <li key={user.id} className={styles.userItem}>
                                <div>
                                    <NavLink to={`/profile/${user.id}`}>
                                        <div>
                                            <img className={styles.userAvatar}
                                                 src={user.photos.small === null ? defaultUserAvatar : user.photos.small}
                                                 alt={`${user.name} avatar`}/>
                                        </div>
                                    </NavLink>
                                    <button disabled={isFollowsFetching.some(id => id === user.id)}
                                            onClick={() => onFollow(user.id, user.followed)}>
                                        {user.followed ? 'unfollow' : 'follow'}
                                    </button>
                                </div>

                                <div className={styles.description}>
                                    <div className={styles.descriptionMain}>
                                        <div>{user.name}</div>
                                        <div className={styles.status}>{user.status}</div>
                                    </div>
                                    <div className={styles.location}>
                                        <span>{'user.location.city'}</span>
                                        <span>{'user.location.country'}</span>
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
