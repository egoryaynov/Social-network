import React from 'react';

import './PostItem.scss';

import avatar from '../../../../assets/avatar.png';

const PostItem = ({message, likesCount}) => {
    return (
        <div className="profile__posts-item">
            <img className="profile__posts-avatar" src={avatar} alt="avatar"/>
            <p>{message}</p>
            <span className="profile__posts-likes">{`Количество лайков: ${likesCount}`}</span>
        </div>
    );
};

export default PostItem;
