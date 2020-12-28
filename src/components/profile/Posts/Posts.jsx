import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = () => {
    return (
        <div className='profile__posts'>
            <div className="profile__posts-add">
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div className='profile__posts-wrapper'>
                <PostItem message='It is post number 1' likesCount='0'/>
                <PostItem message='It is post number 2' likesCount='10'/>
                <PostItem message='It is post number 3' likesCount='24'/>
                <PostItem message='It is post number 4' likesCount='2'/>
                <PostItem message='It is post number 5' likesCount='55'/>
            </div>
        </div>
    );
};

export default Posts;