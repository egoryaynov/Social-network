import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = () => {
    return (
        <div className='profile__posts'>
            <PostItem message='It is post number 1'/>
            <PostItem message='It is post number 2'/>
            <PostItem message='It is post number 3'/>
            <PostItem message='It is post number 4'/>
            <PostItem message='It is post number 5'/>
        </div>
    );
};

export default Posts;
