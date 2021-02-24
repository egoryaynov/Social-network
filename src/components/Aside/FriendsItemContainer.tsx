import React from 'react'
import {connect, MapDispatchToProps} from "react-redux";
import FriendsItem from "./FriendsItem/FriendsItem";
import {AppStateType} from "../../redux/store";
import {FriendType} from "../../types/types";

type MapStateToPropsType = {
    friends: Array<FriendType>
}
type PropsType = MapStateToPropsType

const FriendsItemContainer: React.FC<PropsType> = (props) => {
    return (
        <FriendsItem friends={props.friends}/>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friends: state.sideBar.friends
    }
};
export default connect<MapStateToPropsType, null, null, AppStateType>(mapStateToProps)(FriendsItemContainer);