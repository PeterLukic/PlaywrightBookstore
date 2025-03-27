const { test} = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 

test('Users can register with valid credentials', { tag: '@UserRegister' }, async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    const pageManager = new PageManager(page);
    const pageBooksSignUp = pageManager.getPageBooksSignUp();
    await pageBooksSignUp.goToBookingSignUpPage(dataBookStore.url);
    await pageBooksSignUp.signUpWithRandomData();
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.verifySignInWithRandomData();
});