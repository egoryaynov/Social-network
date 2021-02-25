import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    updateStatus,
    clearUserProfile,
    savePhoto,
    updateProfileInfo
} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType, UpdateProfileInfoPayloadType} from "../../types/types";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authUserID: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userID: number) => void
    getStatus: (userID: number) => void
    updateStatus: (status: string) => void
    clearUserProfile: () => void
    savePhoto: (photoFile: File) => void
    updateProfileInfo: (profileInfo: UpdateProfileInfoPayloadType) => void
}
type PathParamsType = {
    profileUserId?: string
}

export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
    & RouteComponentProps<PathParamsType>

class ProfileContainer extends Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userID: number;

        if (this.props.match.params.profileUserId) {
            userID = parseInt(this.props.match.params.profileUserId)
        } else if (this.props.isAuth && this.props.authUserID) {
            userID = this.props.authUserID
        } else {
            userID = 10;
        }

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

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserID: state.auth.userID,
    isAuth: state.auth.isAuth
})

export default compose(
    withRouter,
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(
        mapStateToProps, {
            getUserProfile,
            getStatus,
            updateStatus,
            clearUserProfile,
            savePhoto,
            updateProfileInfo
        })
)(ProfileContainer)