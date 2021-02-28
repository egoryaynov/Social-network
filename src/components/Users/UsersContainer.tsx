import {connect} from "react-redux";
import React from "react";

import {requestUsers, onFollowUser} from "../../redux/usersReducer";
import Users from "./Users";
import {
    getCurrentPage,
    getIsFetching, getIsFollowsFetching,
    getPageSize, getPagesToShow,
    getSearchFilter,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/usersSelectors";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {FilterType, UserType} from "../../types/types";
import {AppStateType} from "../../redux/store";
import {requestUsersType} from "./types";

import {actions} from '../../redux/usersReducer'

const {changeSearchFilter} = actions;

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    isFollowsFetching: Array<number>
    pagesToShow: number
    searchFilter: FilterType
}
type MapDispatchToPropsType = {
    onFollowUser: (userID: number, isFollow: boolean) => void
    requestUsers: requestUsersType
    changeSearchFilter: (filter: FilterType) => any
}
type PathParamsType = {
    page: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>

// todo refactor logic
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const page = parseInt(this.props.match.params.page) || 1;

        this.makeRequestUsers(page);
    }

    makeRequestUsers = (page: number = this.props.currentPage) => {
        this.props.requestUsers(page, this.props.pageSize, this.props.searchFilter);
    }

    onChangePage = (page: number) => {
        this.makeRequestUsers(page)
    }
    onChangeFilter = (filter: FilterType) => {
        this.props.changeSearchFilter(filter);
        this.makeRequestUsers(1)
    }

    render() {
        return (
            <Users  {...this.props} onChangePage={this.onChangePage} onChangeFilter={this.onChangeFilter}/>
        )
    }

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowsFetching: getIsFollowsFetching(state),
        pagesToShow: getPagesToShow(state),
        searchFilter: getSearchFilter(state)
    }
}

export default compose(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
        mapStateToProps,
        {requestUsers, onFollowUser, changeSearchFilter}
    )
)(UsersContainer) as React.ComponentType