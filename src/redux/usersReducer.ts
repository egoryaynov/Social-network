import {usersAPI} from "../api/api";
import {UserType} from "../types/types";

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const PAGE_CHANGE = 'PAGE_CHANGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOW_FETCHING = 'TOGGLE_FOLLOW_FETCHING';

const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    isFollowsFetching: [] as Array<number>, // array of users id's
    pagesToShow: 19
}
export type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialState => {
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

type FollowToggleActionType = {
    type: typeof FOLLOW_TOGGLE
    userID: number
}
export const followToggle = (userID: number): FollowToggleActionType => ({type: FOLLOW_TOGGLE, userID})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    newCurrentPage: number
}
export const setCurrentPage = (newCurrentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    newCurrentPage
})

type PageChangeActionType = {
    type: typeof PAGE_CHANGE
    users: Array<UserType>
}
export const pageChange = (users: Array<UserType>): PageChangeActionType => ({type: PAGE_CHANGE, users})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type ToggleFollowFetchingActionType = {
    type: typeof TOGGLE_FOLLOW_FETCHING
    isFetching: boolean
    userID: number
}
export const toggleFollowFetching = (isFetching: boolean, userID: number): ToggleFollowFetchingActionType => ({
    type: TOGGLE_FOLLOW_FETCHING,
    isFetching,
    userID
})

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let data = await usersAPI.getUsers(page, pageSize)

    dispatch(setCurrentPage(page))
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

export const onFollowUser = (userID: number, isFollow: boolean) => async (dispatch: any) => {
    dispatch(toggleFollowFetching(true, userID));

    if (isFollow) {
        await usersAPI.deleteFollow(userID)

        dispatch(followToggle(userID))
        dispatch(toggleFollowFetching(false, userID))
    } else {
        await usersAPI.postFollow(userID)

        dispatch(followToggle(userID))
        dispatch(toggleFollowFetching(false, userID))
    }
}

export default usersReducer;