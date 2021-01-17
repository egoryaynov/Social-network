import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.getUserProfile(this.props.match.params.userID)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to="/login"/>

        return (
            <>
                {this.props.profile
                    ? <Profile profile={this.props.profile}/>
                    : <Preloader/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithURLProfileContainer = withRouter(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(WithURLProfileContainer);