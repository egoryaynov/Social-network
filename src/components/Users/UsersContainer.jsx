import {connect} from "react-redux";
import React from "react";

import {
    followToggle, requestUsers, onFollowUser, pageChange, toggleFollowFetching
} from "../../redux/usersReducer";
import Users from "./Users";
import {
    getCurrentPage,
    getIsFetching, getIsFollowsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/usersSelectors";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(1, this.props.pageSize);
    }

    onChangePage = (page) => {
        this.props.requestUsers(page, this.props.pageSize);
    }

    render() {
        return (
            <Users {...this.props} onChangePage={this.onChangePage}/>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowsFetching: getIsFollowsFetching(state)
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        followToggle, pageChange, toggleFollowFetching, requestUsers, onFollowUser
    })
)(UsersContainer)