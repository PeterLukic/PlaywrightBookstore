const { test, expect } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 


test('Users can check previous orders', { tag: '@CheckOrders' }, async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    const pageManager = new PageManager(page);
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.extractOrderDetails();
    await pageBooksProfile.logOrderDetails();
});

test('Users can log out', { tag: '@LogOut' }, async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);  
    const pageManager = new PageManager(page);
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.logOut();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.verifyBookStoreSignPage();

});