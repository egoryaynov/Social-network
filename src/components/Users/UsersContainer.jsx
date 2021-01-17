import {connect} from "react-redux";
import React from "react";

import {
    followToggle, getUsers, onFollowUser, pageChange, toggleFollowFetching
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(1, this.props.pageSize);
    }

    onChangePage = (page) => {
        this.props.getUsers(page, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Users {...this.props} onChangePage={this.onChangePage}/>}
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowsFetching: state.usersPage.isFollowsFetching
    }
}

export default connect(mapStateToProps,
    {
        followToggle, pageChange, toggleFollowFetching, getUsers, onFollowUser
    }
)(UsersContainer)
