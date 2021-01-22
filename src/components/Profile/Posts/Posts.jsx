import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";
import PostForm from "./PostForm/PostForm";

const Posts = React.memo(({posts, addPost}) => {
    return (
        <div className='profile__posts'>
            <PostForm addPost={addPost}/>

            <div className='profile__posts-wrapper'>
                {posts.map(post =>
                    <PostItem key={post.id} message={post.message} likesCount={post.likesCount}/>
                )}
            </div>
        </div>
    );
});

export default Posts;