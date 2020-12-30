import React from 'react';

import './Posts.scss';
import PostItem from "./PostItem/PostItem";

const Posts = ({state, dispatch}) => {
    let textareaEl = React.createRef();

    let clickButton = () => {
        dispatch({
            type: 'ADD-POST',
        })
        dispatch({
            type: 'UPDATE-POST-TEXT',
            newPostText: ''
        })
    }
    let changePost = () => {
        dispatch({
            type: 'UPDATE-POST-TEXT',
            newPostText: textareaEl.current.value
        })
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