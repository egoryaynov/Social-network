import React from 'react';

import PostItem from "./PostItem/PostItem";
import PostForm from "./PostForm/PostForm";

const Posts = React.memo(({posts, addPost}) => {
    return (
        <div>
            <PostForm addPost={addPost}/>

            <div>
                {posts.map(post =>
                    <PostItem key={post.id} message={post.message} likesCount={post.likesCount}/>
                )}
            </div>
        </div>
    );
});

export default Posts;