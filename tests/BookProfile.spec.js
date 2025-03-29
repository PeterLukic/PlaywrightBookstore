const { test } = require('../utils/hooks'); 
const dataBookStore = require('../utils/dataBookStore.json');

test('Users can check previous orders', { tag: '@CheckOrders' }, async ({ testContext }) => {
    const { pageManager } = testContext;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.extractOrderDetails();
    await pageBooksProfile.logOrderDetails();
});

test('Users can log out', { tag: '@LogOut' }, async ({ testContext}) => {
    const { pageManager } = testContext;
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.goToBookingSignInPage(dataBookStore.url);
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.email, dataBookStore.password);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.dropdownButtonClick();
    await pageBooksProfile.logOutClick();
    const pageBooksList = pageManager.getPageBooksList();
    await pageBooksList.verifyBookStoreSignPage();
});