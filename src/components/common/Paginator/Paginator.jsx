import React from 'react';

import style from './Paginator.module.scss';
import {calcShowItems} from "../../../utils/paginator";

const Paginator = ({className = '', totalItemsCount, pageSize, currentPage, onChangePage, pagesToShow}) => {
    const pagesMemo = React.useMemo(() => {
        const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return pages;
    }, [totalItemsCount, pageSize])

    const showItems = calcShowItems(pagesMemo, currentPage, pagesToShow);

    return (
        <div className={`${style.paginator} ${className}`}>
            <button className={currentPage === 1 ? "hide" : ""}
                    disabled={currentPage === 1}
                    onClick={() => onChangePage(currentPage - 1)}>
                Prev
            </button>

            <div className={style.paginatorWrapper}>
                {showItems.map((page) => (
                    <span
                        className={currentPage === page
                            ? `${style.paginatorItem} ${style.paginatorItemActive}`
                            : `${style.paginatorItem}`}
                        onClick={() => onChangePage(page)}>{page}</span>
                ))}
            </div>

            <button className={currentPage === pagesMemo.length ? "hide" : ""}
                    disabled={currentPage === pagesMemo.length}
                    onClick={() => onChangePage(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Paginator;
