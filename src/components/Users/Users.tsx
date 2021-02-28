import React from 'react';
import {NavLink, useRouteMatch} from "react-router-dom";

import defaultUserAvatar from "../../assets/default-user-avatar.jpg";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";

import styles from './Users.module.scss';

import {FilterType} from "../../types/types";
import SearchForm from "./SearchForm/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getIsFetching, getIsFollowsFetching,
    getPageSize, getPagesToShow,
    getSearchFilter,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/usersSelectors";
import {onChangeFilterThunk, onFollowUser, requestUsers} from '../../redux/usersReducer';

import {actions} from '../../redux/usersReducer'

const Users: React.FC = () => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const searchFilter = useSelector(getSearchFilter);
    const isFollowsFetching = useSelector(getIsFollowsFetching);
    const isFetching = useSelector(getIsFetching);
    const pagesToShow = useSelector(getPagesToShow);

    const dispatch = useDispatch();

    const route = useRouteMatch<{ page?: string }>()

    React.useEffect(() => {
        const page = parseInt(route.params.page as string) || 1;
        makeRequestUsers(page);

        return () => {
            dispatch(actions.changeSearchFilter({friend: null, term: null}))
        }
    }, [])

    let onFollow = (userID: number, isFollow: boolean) => {
        dispatch(onFollowUser(userID, isFollow))
    }

    const makeRequestUsers = (page: number = currentPage) => {
        dispatch(requestUsers(page, pageSize, searchFilter));
    }

    const onChangePage = (page: number) => {
        makeRequestUsers(page)
    }
    const onChangeFilter = (filter: FilterType) => {
        dispatch(onChangeFilterThunk(1, pageSize, filter))
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

            <SearchForm onChangeFilter={onChangeFilter}/>

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
