import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profileReducer";

const Posts = ({state, dispatch}) => {
    let clickButton = () => {
        dispatch(addPostActionCreator());
        dispatch(updatePostTextActionCreator(''));
    }
    let changePost = (event) => {
        dispatch(updatePostTextActionCreator(event.target.value));
    }

    return (
        <div className='profile__posts'>
            <div className="profile__posts-add">
                <textarea value={state.postText} onChange={changePost}/>
                <button onClick={clickButton}>Add post</button>
            </div>

            <div className='profile__posts-wrapper'>
                {state.posts.map(post =>
                    <PostItem message={post.message} likesCount={post.likesCount}/>
                )}
            </div>
        </div>
    );
};

export default Posts;