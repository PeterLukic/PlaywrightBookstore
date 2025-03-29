const { test } = require('../utils/hooks'); 
const dataBookStore = require('../utils/dataBookStore.json');

test('Clicking on a book in the list leads to a detailed book page', { tag: '@BookClick' }, async ({ testContext }) => {   
    const { pageManager } = testContext; 
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
});

test('The detailed page displays the books title, price, and description', { tag: '@BookDisplay' }, async ({ testContext }) => {  
    const { pageManager } = testContext; 
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
    const pageBooksDetails = pageManager.getPageBooksDetails(); 
    await pageBooksDetails.verifyBookDetails(dataBookStore.bookName,
        dataBookStore.bookPrice, dataBookStore.bookDescription);
});