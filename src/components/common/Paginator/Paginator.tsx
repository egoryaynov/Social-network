import React from 'react';

import style from './Paginator.module.scss';
import {calcShowItems} from "../../../utils/paginator";

type PropsType = {
    className: string
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onChangePage: (pageNumber: number) => void
    pagesToShow: number
}

const Paginator: React.FC<PropsType> = ({
                                            className = '',
                                            totalItemsCount,
                                            pageSize,
                                            currentPage,
                                            onChangePage,
                                            pagesToShow
                                        }) => {
    const pagesMemo = React.useMemo((): Array<number> => {
        const pagesCount: number = Math.ceil(totalItemsCount / pageSize);
        const pages: Array<number> = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return pages;
    }, [totalItemsCount, pageSize])

    const showItems: Array<number> = calcShowItems(pagesMemo, currentPage, pagesToShow);

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
