import React from "react";
import Posts from "./Posts";

import {addPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {PostType} from "../../../types/types";
import {AppStateType} from "../../../redux/store";

type MapStateToPropsType = {
    posts: Array<PostType>
}
type MapDispatchToPropsType = {
    addPost: (postText: string) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const PostsContainer: React.FC<PropsType> = (props) => {
    return (
        <Posts posts={props.posts} addPost={props.addPost}/>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    posts: state.profilePage.posts
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(
    mapStateToProps,
    {addPost}
)(PostsContainer);
