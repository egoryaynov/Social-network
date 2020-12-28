import React from 'react';

import './PostItem.scss';

const PostItem = ({message, likesCount}) => {
    return (
        <div className="profile__posts-item">
            <p>{message}</p>
            <span>{`Количество лайков: ${likesCount}`}</span>
        </div>
    );
};

export default PostItem;
