const { test } = require('../utils/hooks'); 
const dataBookStore = require('../utils/dataBookStore.json');

test('Adding books to the shopping cart', { tag: '@AddBook' }, async ({ testContext }) => {
    const { pageManager } = testContext;
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

test('Viewing the shopping cart', { tag: '@ShopCard' }, async ({ testContext }) => {
    const { pageManager } = testContext;
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

test('Checkout process', { tag: '@Checkout' }, async ({ testContext }) => {
    const { pageManager } = testContext;
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

test('Users can use fake/demo credit cards provided at the checkout page', { tag: '@PurchaseBook' }, async ({ testContext }) => {
    const { pageManager } = testContext;
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
