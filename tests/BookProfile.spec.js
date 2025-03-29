const { test, expect } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 

test.beforeEach(async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    test.info().pageManager = new PageManager(page); // Store it in test context
});

test('Users can check previous orders', { tag: '@CheckOrders' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.extractOrderDetails();
    await pageBooksProfile.logOrderDetails();
});

test('Users can log out', { tag: '@LogOut' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.dropdownButtonClick();
    await pageBooksProfile.logOutClick();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.verifyBookStoreSignPage();
 

});