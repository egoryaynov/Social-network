import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = ({state, addPost, updatePostText}) => {
    let textareaEl = React.createRef();

    let clickButton = () => {
        addPost();
        updatePostText('');
    }
    let changePost = () => {
        updatePostText(textareaEl.current.value);
    }

    return (
        <div className='profile__posts'>
            <div className="profile__posts-add">
                <textarea ref={textareaEl} value={state.postText} onChange={changePost}/>
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