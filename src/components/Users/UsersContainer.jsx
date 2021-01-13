import {connect} from "react-redux";
import React from "react";
import axios from "axios";

import {
    followToggle, pageChange, setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onChangePage = (page) => {
        this.props.setCurrentPage(page)

        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.pageChange(response.data.items)
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
// const mapDispatchToProps = (dispatch) => {
//     return {
//         followToggle: (userID) => dispatch(followToggleAC(userID)),
//         setUsers: (users) => dispatch(setUsersAC(users)),
//         setTotalUsersCount: (totalUsersCount) => dispatch(setTotalUsersCountAC(totalUsersCount)),
//         setCurrentPage: (newCurrentPage) => dispatch(setCurrentPageAC(newCurrentPage)),
//         pageChange: (users) => dispatch(pageChangeAC(users)),
//         toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching))
//     }
// }

export default connect(mapStateToProps, {
    followToggle, setUsers, setTotalUsersCount, setCurrentPage, pageChange, toggleIsFetching
})(UsersContainer)
