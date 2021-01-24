import React from 'react';

import style from './Paginator.module.scss';

const Paginator = ({className = '', totalItemsCount, pageSize, currentPage, onChangePage}) => {
    const pagesMemo = React.useMemo(() => {
        const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return pages;
    }, [totalItemsCount, pageSize])

    return (
        <div className={`${style.paginator} ${className}`}>
            {pagesMemo.map((page) => (
                <span
                    className={currentPage === page
                        ? `${style.paginatorItem} ${style.paginatorItemActive}`
                        : `${style.paginatorItem}`}
                    onClick={() => onChangePage(page)}>{page}</span>
            ))}
        </div>
    );
};

export default Paginator;
