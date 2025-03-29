const { test } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const PopupHelper = require('../utils/PopupHelper'); 

test.beforeEach(async ({ page }) => {
    const popupHelper = new PopupHelper(page);
    await popupHelper.blockAds(page);
    test.info().pageManager = new PageManager(page); // Store it in test context
});

test('Adding books to the shopping cart', { tag: '@AddBook' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();
    await pageBooksProfile.verifyUserLoggedText();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
    const pageBooksDetails = pageManager.getPageBooksDetails(); 
    await pageBooksDetails.clickButtonAddToCart();

});

test('Viewing the shopping cart', { tag: '@ShopCard' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();
    await pageBooksProfile.verifyUserLoggedText();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
    const pageBooksDetails = pageManager.getPageBooksDetails(); 
    await pageBooksDetails.clickButtonAddToCart();
    const pageBoookShoppingCart = pageManager.getPageBoookShoppingCart(); 
    await pageBoookShoppingCart.goToPageBoookShoppingCart(dataBookStore.url);
    await pageBoookShoppingCart.verifyCartItems();
});

test('Checkout process', { tag: '@Checkout' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();
    await pageBooksProfile.verifyUserLoggedText();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName);
    const pageBooksDetails = pageManager.getPageBooksDetails(); 
    await pageBooksDetails.clickButtonAddToCart();
    const pageBoookShoppingCart = pageManager.getPageBoookShoppingCart(); 
    await pageBoookShoppingCart.goToPageBoookShoppingCart(dataBookStore.url);
    await pageBoookShoppingCart.verifyCartItems();
    await pageBoookShoppingCart.clickButtonProceedToCheckout();
});

test('Users can use fake/demo credit cards provided at the checkout page', { tag: '@PurchaseBook' }, async ({ page }) => {
    const pageManager = test.info().pageManager;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);  
    const pageBooksProfile = pageManager.getPageBooksProfile();
    await pageBooksProfile.verifyUserLoggedText();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.goToBookingListPage(dataBookStore.url);
    await pageBooksList.clickOnBookByTitle(dataBookStore.bookName); 
    const pageBooksDetails = pageManager.getPageBooksDetails(); 
    await pageBooksDetails.clickButtonAddToCart(); 
    const pageBoookShoppingCart = pageManager.getPageBoookShoppingCart(); 
    await pageBoookShoppingCart.goToPageBoookShoppingCart(dataBookStore.url);
    await pageBoookShoppingCart.verifyCartItems();
    await pageBoookShoppingCart.clickButtonProceedToCheckout(); 
    const pageBooksCheckout = pageManager.getPageBooksCheckout();
    pageBooksCheckout.fillCheckoutForm(dataBookStore.name, dataBookStore.address, 
        dataBookStore.cardHolderName, dataBookStore.creditCardNumber, 
        dataBookStore.expirationMonth, dataBookStore.expirationYear, dataBookStore.cvcNumber);
    await pageBooksCheckout.clickButtonPurchase(); 
    await pageBooksProfile.extractOrderIdFromFlashMessage();
    await pageBooksProfile.extractOrderDetails();
    await pageBooksProfile.verifyOrderDetails(dataBookStore.orderId, dataBookStore.bookName, dataBookStore.bookPrice);
});
