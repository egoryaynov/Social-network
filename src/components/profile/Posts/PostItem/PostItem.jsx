import React from 'react';

const PostItem = ({message}) => {
    return (
        <div className="profile__posts-item">
            {message}
        </div>
    );
};

export default PostItem;
