import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = ({dataPosts}) => {
    return (
        <div className='profile__posts'>
            <div className="profile__posts-add">
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div className='profile__posts-wrapper'>
                {dataPosts.map(post => <PostItem message={post.message} likesCount={post.likesCount}/>)}
            </div>
        </div>
    );
};

export default Posts;