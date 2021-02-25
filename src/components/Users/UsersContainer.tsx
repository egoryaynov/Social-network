import {connect} from "react-redux";
import React from "react";

import {requestUsers, onFollowUser} from "../../redux/usersReducer";
import Users from "./Users";
import {
    getCurrentPage,
    getIsFetching, getIsFollowsFetching,
    getPageSize, getPagesToShow,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/usersSelectors";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    isFollowsFetching: Array<number>
    pagesToShow: number
}
type MapDispatchToPropsType = {
    onFollowUser: (userID: number, isFollow: boolean) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}
type PathParamsType = {
    page: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const page = parseInt(this.props.match.params.page) || 1;

        this.props.requestUsers(page, this.props.pageSize);
    }

    onChangePage = (page: number) => {
        this.props.requestUsers(page, this.props.pageSize);
    }

    render() {
        return (
            <Users users={this.props.users}
                   onChangePage={this.onChangePage}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   isFetching={this.props.isFetching}
                   isFollowsFetching={this.props.isFollowsFetching}
                   pagesToShow={this.props.pagesToShow}
                   onFollowUser={this.props.onFollowUser}
            />
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
        pagesToShow: getPagesToShow(state)
    }
}

export default compose(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(
        mapStateToProps,
        {requestUsers, onFollowUser}
    )
)(UsersContainer)