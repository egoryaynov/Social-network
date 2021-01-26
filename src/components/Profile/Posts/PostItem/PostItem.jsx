import React from 'react';

import styles from './PostItem.module.scss';

import avatar from '../../../../assets/avatar.png';

const PostItem = ({message, likesCount}) => {
    return (
        <div className={styles.item}>
            <img className={styles.avatar} src={avatar} alt="avatar"/>
            <p>{message}</p>
            <span className={styles.likes}>{`Количество лайков: ${likesCount}`}</span>
        </div>
    );
};

export default PostItem;
