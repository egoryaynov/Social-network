import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, clearUserProfile, savePhoto} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends Component {
    componentDidMount() {
        let userID = this.props.match.params.userID || (this.props.isAuth && this.props.authUserID);

        this.props.getUserProfile(userID)
        this.props.getStatus(userID)
    }

    componentWillUnmount() {
        this.props.clearUserProfile()
    }

    render() {
        return (
            <>
                {this.props.profile
                    ? <Profile {...this.props}/>
                    : <Preloader/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserID: state.auth.userID,
    isAuth: state.auth.isAuth
})

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, clearUserProfile, savePhoto})
)(ProfileContainer)