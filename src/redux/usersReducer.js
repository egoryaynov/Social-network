import {usersAPI} from "../api/api";

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const PAGE_CHANGE = 'PAGE_CHANGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOW_FETCHING = 'TOGGLE_FOLLOW_FETCHING';

const initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    isFollowsFetching: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_TOGGLE: {
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userID
                        ? {...user, followed: !user.followed}
                        : user
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        }
        case PAGE_CHANGE: {
            return {
                ...state,
                users: action.users
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_FOLLOW_FETCHING: {
            return {
                ...state,
                isFollowsFetching: action.isFetching
                    ? [...state.isFollowsFetching, action.userID]
                    : state.isFollowsFetching.filter(id => action.userID !== id)
            }
        }
        default:
            return state
    }
}

export const followToggle = (userID) => ({type: FOLLOW_TOGGLE, userID})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const setCurrentPage = (newCurrentPage) => ({type: SET_CURRENT_PAGE, newCurrentPage})
export const pageChange = (users) => ({type: PAGE_CHANGE, users})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowFetching = (isFetching, userID) => ({type: TOGGLE_FOLLOW_FETCHING, isFetching, userID})

export const getUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(page, pageSize)
            .then(data => {
                dispatch(setCurrentPage(page))
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            })
    }
}

export const onFollowUser = (userID, isFollow) => {
    return (dispatch) => {
        dispatch(toggleFollowFetching(true, userID));

        if (isFollow) {
            usersAPI.deleteFollow(userID)
                .then(() => {
                    dispatch(followToggle(userID))
                    dispatch(toggleFollowFetching(false, userID))
                })
        } else {
            usersAPI.postFollow(userID)
                .then(() => {
                    dispatch(followToggle(userID))
                    dispatch(toggleFollowFetching(false, userID))
                })
        }
    }
}

export default usersReducer;