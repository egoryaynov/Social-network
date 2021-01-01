import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = ({state, changePost, buttonClick}) => {
    let onClickButton = () => {
        buttonClick();
    }
    let onChangePost = (event) => {
        changePost(event.target.value);
    }

    return (
        <div className='profile__posts'>
            <div className="profile__posts-add">
                <textarea value={state.postText} onChange={onChangePost}/>
                <button onClick={onClickButton}>Add post</button>
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