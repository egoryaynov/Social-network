export const calcShowItems = (pages, currentPage) => {
    const pagesToShow = 19;
    const showPages = getShowPages(pages, currentPage, pagesToShow);

    return assemblyPages(pages, currentPage, showPages, pagesToShow);
}

const getShowPages = (pages, currentPage, pagesToShow) => {
    let showPages;
    if (pages.length - currentPage < pagesToShow) {
        showPages = pages.slice(-pagesToShow);
    } else {
        showPages = pages.slice(currentPage - 1, currentPage - 1 + pagesToShow);
    }

    return showPages;
}
const assemblyPages = (pages, currentPage, showPages, pagesToShow) => {
    let result;
    if (currentPage === 1) {
        result = [...showPages, pages.length];
    } else if ((currentPage === pages.length) || (pages.length - currentPage < pagesToShow)) {
        result = [1, ...showPages];
    } else {
        result = [1, ...showPages, pages.length];
    }

    return result;
}