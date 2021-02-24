import {createSelector} from "reselect";
import {AppStateType} from "../store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

// This is examples how to use reselect
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users
})

export const getPagesToShow = (state: AppStateType) => {
    return state.usersPage.pagesToShow
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getIsFollowsFetching = (state: AppStateType) => {
    return state.usersPage.isFollowsFetching
}