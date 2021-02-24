import React from 'react';

import PostItem from "./PostItem/PostItem";
import PostForm from "./PostForm/PostForm";
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (postText: string) => void
}
const Posts = React.memo<PropsType>(({posts, addPost}) => {
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