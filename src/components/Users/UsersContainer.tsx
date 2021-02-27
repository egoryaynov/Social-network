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
import {requestUsersType} from "./types";

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
    requestUsers: requestUsersType
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

    state = {
        term: null
    }

    onChangePage = (page: number) => {
        this.props.requestUsers(page, this.props.pageSize, this.state.term);
    }
    onSearch = (newTerm: string) => {
        this.setState({
            term: newTerm
        })
    }

    render() {
        return (
            <Users  {...this.props} onChangePage={this.onChangePage} onSearch={this.onSearch}/>
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
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
        mapStateToProps,
        {requestUsers, onFollowUser}
    )
)(UsersContainer) as React.ComponentType