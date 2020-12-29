import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = ({state}) => {
    return (
        <div className='profile__posts'>
            <div className="profile__posts-add">
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div className='profile__posts-wrapper'>
                {state.posts.map(post => <PostItem message={post.message} likesCount={post.likesCount}/>)}
            </div>
        </div>
    );
};

export default Posts;