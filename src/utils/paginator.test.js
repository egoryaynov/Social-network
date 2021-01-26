import {calcShowItems} from "./paginator";

describe("Validate utilities for paginator", () => {
    const pagesToShow = 20;
    const pages = [];
    for (let i = 1; i < 100; i++) {
        pages.push(i);
    }

    it("should show first and last page if current page in the middle", () => {
        const currentPage = Math.ceil(pages.length / 2);

        const output = [1, ...pages.slice(currentPage - 1, currentPage - 1 + pagesToShow), pages.length];
        expect(calcShowItems(pages, currentPage, pagesToShow)).toStrictEqual(output);
    });

    describe("validate on 1st and last currentPage position", () => {
        it("should don't push page 1 to array if currentPage equal 1", () => {
            const currentPage = 1;

            const output = [...pages.slice(0, pagesToShow), pages.length];
            expect(calcShowItems(pages, currentPage, pagesToShow)).toStrictEqual(output);
        });
        it("should don't push last page to array if currentPage equal last page", () => {
            const currentPage = 100;

            const output = [1, ...pages.slice(-pagesToShow)];
            expect(calcShowItems(pages, currentPage, pagesToShow)).toStrictEqual(output);
        });
    })

    describe("validate for doubling", () => {
        it("should don't doubling 1st page if currentPage is 2", () => {
            const currentPage = 2;

            const output = [1, ...pages.slice(currentPage - 1, currentPage - 1 + pagesToShow), pages.length];
            expect(calcShowItems(pages, currentPage, pagesToShow)).toStrictEqual(output);
        });
        it("should don't doubling last page if currentPage is lastPage - 1", () => {
            const currentPage = pages.length - 1;

            const output = [1, ...pages.slice(-pagesToShow)];
            expect(calcShowItems(pages, currentPage, pagesToShow)).toStrictEqual(output);
        });
    })
})
