import {usersAPI} from "../api/api";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'FOLLOW_TOGGLE': {
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userID
                        ? {...user, followed: !user.followed}
                        : user
                })
            }
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'TOGGLE_FOLLOW_FETCHING': {
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

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    followToggle: (userID: number) => ({type: 'FOLLOW_TOGGLE', userID} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setCurrentPage: (newCurrentPage: number) => ({type: 'SET_CURRENT_PAGE', newCurrentPage} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowFetching: (isFetching: boolean, userID: number) => ({
        type: 'TOGGLE_FOLLOW_FETCHING',
        isFetching,
        userID
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));

        let data = await usersAPI.getUsers(page, pageSize)

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