import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import axios from "axios";
import Preloader from "../common/Preloader";
import {withRouter} from "react-router-dom";

class ProfileContainer extends Component {
    componentDidMount() {
        let userID = this.props.match.params.userID || 2
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
            .then(response => {
                this.props.setUserProfile(response.data)
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