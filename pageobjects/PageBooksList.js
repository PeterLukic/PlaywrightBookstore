const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const { expect } = require("@playwright/test");

class PageBooksList {

    constructor(page) {
        this.page = page;
        this.books = page.locator("#books .card-product-user"); // Locator for all books
        this.bookTitle = page.locator(".card-title"); // Locator for book titles
        this.bookPrice = page.locator(".card-text[style*='color: crimson']"); // Locator for prices
        this.searchInput = page.locator('#search-input'); // Locator for serach input
        this.searchButton = page.locator('#search-input + button'); // Locator for search button
        this.sortDropdownPrice = page.locator('div.filter_sort-select'); // Locator for the sort dropdown
        this.sortListPrice = page.locator('ul.filter_sort-select-list'); // Locator for the sort list
        this.sortAscOptionPrice = page.locator('a.filter_sort-select__item-link[href="?sort=asc"]'); // Locator for the 'Sort By ASC' option
        this.sortDescOptionPrice = page.locator('a.filter_sort-select__item-link[href="?sort=desc"]'); // Locator for the 'Sort By DESC' option
        this.bookTitleText = (title) => this.page.locator('h5.card-title', { hasText: title }) // Locator for the book title
        this.labelBookList = page.locator("//h1[@class='mt-3']"); // Locator for the Book List label
    }

    // Method to navigate to the booking list page
    async goToBookingListPage(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    // Method to get the list of books with their titles and prices
    async getBooksList() {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
        const count = await this.books.count();
        let bookDetails = [];

        for (let i = 0; i < count; i++) {
            let title = await this.bookTitle.nth(i).textContent();
            let price = await this.bookPrice.nth(i).textContent();

            bookDetails.push({
                title: title.trim(),
                price: price.trim()
            });
        }

        return bookDetails;
    }

    // Method to search for a book by name
    async searchBook(title) {
        await this.searchInput.fill(title);
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    }

    // Method to verify if a book with the specified title and price exists in the list
    async verifyBook(title, price) {
        const bookDetails = await this.getBooksList();
        const bookFound = bookDetails.some(book => book.title === title && book.price === price);
        return bookFound;
    }

    // Method to hover over and click on the sort order element (ASC or DESC)
    async selectSortOrderPriceBook(sortOrder) {
        const sortElement = this.page.locator('.filter_sort-select');
        await sortElement.hover();
        const sortOption = this.page.locator(`.filter_sort-select__item-link[href*='sort=${sortOrder}']`);
        await this.page.route('**/*ads*', route => route.abort());
        await sortOption.click();
        await this.page.waitForLoadState('load', { timeout: 30000 });
    }

    // Method to verify if the page is sorted in either ascending or descending order
    async isSortedPrice(order = 'asc') {
        await this.page.waitForLoadState('load', { timeout: 30000 });
        const bookDetails = await this.getBooksList();
        const isSorted = bookDetails.every((book, index, array) => {
            if (index === 0) return true;
            if (order === 'asc') {
                return book.price >= array[index - 1].price;  // Ascending check
            } else if (order === 'desc') {
                return book.price <= array[index - 1].price;  // Descending check
            }
            throw new Error('Invalid order parameter. Use "asc" or "desc".');
        });

        return isSorted;
    }

    // Method to select the sorting order (ascending or descending)
    async sortByPrice(sortOrderPrice) {
        await this.page.waitForLoadState('networkidle');
        await this.sortDropdownPrice.hover();
        await this.page.waitForTimeout(100);
        await this.sortListPrice.waitFor({ state: 'visible' });
        if (sortOrderPrice === 'asc') {
            await this.sortAscOptionPrice.click();
        } else if (sortOrderPrice === 'desc') {
            await this.sortDescOptionPrice.click();
        } else {
            throw new Error('Invalid sort order. Use "asc" or "desc".');
        }
    }

    // Method to click on a book by title text
    async clickOnBookByTitle(bookTitle) {
        await this.bookTitleText(bookTitle).click();
    }

    // Method to verify if the user is on BookStore's sign in page
    async verifyBookStoreSignPage() {
        await expect(this.page).toHaveURL(dataBookStore.url);
        await expect(this.labelBookList).toHaveText('Books List');
    }  
}


module.exports = { PageBooksList };