import React from 'react';
import Posts from "./Posts/Posts";

import {addPostActionCreator, updatePostTextActionCreator} from "../../redux/profileReducer";

const PostsContainer = ({store}) => {
    let state = store.getState();

    const changePost = (text) => {
        store.dispatch(updatePostTextActionCreator(text));
    };
    const buttonClick = () => {
        store.dispatch(addPostActionCreator());
        store.dispatch(updatePostTextActionCreator(''));
    };

    return (
        <Posts state={state.profilePage} changePost={changePost} buttonClick={buttonClick}/>
    );
};

export default PostsContainer;
