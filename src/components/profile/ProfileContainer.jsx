import React, {Component} from 'react';
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

let WithURLProfileContainer = withRouter(ProfileContainer);
export default connect(mapStateToProps, {getUserProfile})(WithURLProfileContainer);