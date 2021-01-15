import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";
import {usersAPI} from "../../api/getUsers";

class ProfileContainer extends Component {
    componentDidMount() {
        let userID = this.props.match.params.userID || 2

        usersAPI.getUserProfile(userID)
            .then(data => {
                this.props.setUserProfile(data)
            })
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

export default connect(mapStateToProps, {
    setUserProfile
})(WithURLProfileContainer);