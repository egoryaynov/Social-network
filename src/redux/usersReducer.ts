import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./store";
import {usersAPI} from "../api/users-api";

import {FilterType} from '../types/types'

const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    isFollowsFetching: [] as Array<number>, // array of users id's
    pagesToShow: 19,
    searchFilter: {
        friend: null,
        term: null
    } as FilterType
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'users/FOLLOW_TOGGLE': {
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userID
                        ? {...user, followed: !user.followed}
                        : user
                })
            }
        }
        case 'users/SET_USERS': {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case 'users/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case 'users/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        }
        case 'users/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'users/TOGGLE_FOLLOW_FETCHING': {
            return {
                ...state,
                isFollowsFetching: action.isFetching
                    ? [...state.isFollowsFetching, action.userID]
                    : state.isFollowsFetching.filter(id => action.userID !== id)
            }
        }
        case "users/CHANGE_SEARCH_FILTER": {
            return {
                ...state,
                searchFilter: action.filter
            }
        }
        default:
            return state
    }
}

export const actions = {
    followToggle: (userID: number) => ({
        type: 'users/FOLLOW_TOGGLE',
        userID
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: 'users/SET_USERS',
        users
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'users/SET_TOTAL_USERS_COUNT', totalUsersCount
    } as const),
    setCurrentPage: (newCurrentPage: number) => ({
        type: 'users/SET_CURRENT_PAGE', newCurrentPage
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'users/TOGGLE_IS_FETCHING', isFetching
    } as const),
    toggleFollowFetching: (isFetching: boolean, userID: number) => ({
        type: 'users/TOGGLE_FOLLOW_FETCHING',
        isFetching,
        userID
    } as const),
    changeSearchFilter: (filter: FilterType) => ({
        type: 'users/CHANGE_SEARCH_FILTER',
        filter
    } as const)
}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));

        const termUri = !filter.term ? '' : `&term=${filter.term}`
        const friendUri = filter.friend == null ? '' : `&friend=${filter.friend}`

        let data = await usersAPI.getUsers(page, pageSize, termUri, friendUri)

        dispatch(actions.setCurrentPage(page))
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

export const onFollowUser = (userID: number, isFollow: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowFetching(true, userID));

        if (isFollow) {
            await usersAPI.deleteFollow(userID)

            dispatch(actions.followToggle(userID))
            dispatch(actions.toggleFollowFetching(false, userID))
        } else {
            await usersAPI.postFollow(userID)

            dispatch(actions.followToggle(userID))
            dispatch(actions.toggleFollowFetching(false, userID))
        }
    }
}

export default usersReducer;

export type InitialState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>