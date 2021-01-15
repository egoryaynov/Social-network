import {connect} from "react-redux";
import React from "react";

import {
    followToggle, pageChange, setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {getUsers} from "../../api/getUsers";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        getUsers(1, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onChangePage = (page) => {
        this.props.setCurrentPage(page)

        this.props.toggleIsFetching(true)

        getUsers(page, this.props.pageSize)
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
                    : <Users totalUsersCount={this.props.totalUsersCount} users={this.props.users}
                             currentPage={this.props.currentPage} followToggle={this.props.followToggle}
                             onChangePage={this.onChangePage} pageSize={this.props.pageSize}/>}
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
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    followToggle, setUsers, setTotalUsersCount, setCurrentPage, pageChange, toggleIsFetching
})(UsersContainer)
