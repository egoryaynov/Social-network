import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.getUserProfile(this.props.match.params.userID)
    }

    render() {
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
    profile: state.profilePage.profile
})

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getUserProfile})
)(ProfileContainer)