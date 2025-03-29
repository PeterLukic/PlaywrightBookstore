const { test, expect } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 

test.beforeEach(async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    test.info().pageManager = new PageManager(page); // Store it in test context
});

test('Displays a list of books with titles and prices', { tag: '@BookListingDisplay' }, async ({ page }) => { 
    const pageManager = test.info().pageManager;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    const books = await pageBooksList.getBooksList();
    console.log(books);
});

test('Allows book filtering by keywords (Basic search)', { tag: '@BookSearch' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.searchBook(dataBookStore.bookName);  
    const isBookFound = await pageBooksList.verifyBook(dataBookStore.bookName, dataBookStore.bookPrice);
    expect(isBookFound).toBe(true);
});

test('Allows sorting books by price (ascending and descending)', { tag: '@BookSorting' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.sortByPrice('asc');
    const isSortedPriceAsc = await pageBooksList.isSortedPrice('asc');
    expect(isSortedPriceAsc).toBe(true);
    await pageBooksList.sortByPrice('desc');
    const isSortedPriceDesc = await pageBooksList.isSortedPrice('desc');
    expect(isSortedPriceDesc).toBe(true);
});

