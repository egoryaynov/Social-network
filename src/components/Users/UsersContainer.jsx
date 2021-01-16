import {connect} from "react-redux";
import React from "react";

import {
    followToggle, pageChange, setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowFetching, toggleIsFetching
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {usersAPI} from "../../api/getUsers";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(1, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onChangePage = (page) => {
        this.props.setCurrentPage(page)

        this.props.toggleIsFetching(true)

        usersAPI.getUsers(page, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.pageChange(data.items)
            })
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
        followToggle, setUsers, setTotalUsersCount, setCurrentPage, pageChange, toggleIsFetching, toggleFollowFetching
    }
)(UsersContainer)
