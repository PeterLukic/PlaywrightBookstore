const { test} = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 

test.beforeEach(async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    test.info().pageManager = new PageManager(page); // Store it in test context
});

test('Users can register with valid credentials', { tag: '@UserRegister' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignUp = pageManager.getPageBooksSignUp();
    await pageBooksSignUp.goToBookingSignUpPage(dataBookStore.url);
    await pageBooksSignUp.signUpWithRandomData();
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.verifySignInWithRandomData();
});