const { test, expect } = require('../utils/hooks'); 
const dataBookStore = require('../utils/dataBookStore.json');

test('Displays a list of books with titles and prices', { tag: '@BookListingDisplay' }, async ({ testContext }) => { 
    const { pageManager } = testContext;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    const books = await pageBooksList.getBooksList();
    console.log(books);
});

test('Allows book filtering by keywords (Basic search)', { tag: '@BookSearch' }, async ({ testContext }) => {
    const { pageManager } = testContext;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.searchBook(dataBookStore.bookName);  
    const isBookFound = await pageBooksList.verifyBook(dataBookStore.bookName, dataBookStore.bookPrice);
    expect(isBookFound).toBe(true);
});

test('Allows sorting books by price (ascending and descending)', { tag: '@BookSorting' }, async ({ testContext }) => {
    const { pageManager } = testContext
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.sortByPrice('asc');
    const isSortedPriceAsc = await pageBooksList.isSortedPrice('asc');
    expect(isSortedPriceAsc).toBe(true);
    await pageBooksList.sortByPrice('desc');
    const isSortedPriceDesc = await pageBooksList.isSortedPrice('desc');
    expect(isSortedPriceDesc).toBe(true);
});

