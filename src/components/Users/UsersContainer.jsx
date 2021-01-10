import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followToggleActionCreator, setUsersActionCreator} from "../../redux/usersReducer";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        followToggle: (userID) => dispatch(followToggleActionCreator(userID)),
        setUsers: (users) => dispatch(setUsersActionCreator(users)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

