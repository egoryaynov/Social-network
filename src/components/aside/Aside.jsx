import React from 'react';
import './Aside.scss';

const Aside = () => {
    return (
        <aside className='aside'>
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <a href="#profile" className="nav__link active">Profile</a>
                    </li>
                    <li className="nav__item">
                        <a href="#messages" className="nav__link">Messages</a>
                    </li>
                    <li className="nav__item">
                        <a href="#news" className="nav__link">News</a>
                    </li>
                    <li className="nav__item">
                        <a href="#music" className="nav__link">Music</a>
                    </li>
                    <li className="nav__item">
                        <a href="#setting" className="nav__link">Setting</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Aside;
