const { test } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 

test.beforeEach(async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    test.info().pageManager = new PageManager(page); // Store it in test context
});

test('Clicking on a book in the list leads to a detailed book page', { tag: '@BookClick' }, async ({ page }) => {   
    const pageManager = test.info().pageManager;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
});

test('The detailed page displays the books title, price, and description', { tag: '@BookDisplay' }, async ({ page }) => {  
    const pageManager = test.info().pageManager;
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
    const pageBooksDetails = pageManager.getPageBooksDetails(); 
    await pageBooksDetails.verifyBookDetails(dataBookStore.bookName,
        dataBookStore.bookPrice, dataBookStore.bookDescription);
});