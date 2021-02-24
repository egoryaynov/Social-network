import React from 'react';

import styles from './PageNotFound.module.scss';
import {NavLink} from "react-router-dom";

const PageNotFound: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2><i>Ooops, sorry, this page is not found :(</i></h2>
            <span>You can visit main page: </span>
            <NavLink to='/'>Main page</NavLink>
        </div>
    );
};

export default PageNotFound;
