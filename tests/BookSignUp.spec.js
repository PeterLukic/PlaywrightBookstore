const { test } = require('../utils/hooks'); 
const dataBookStore = require('../utils/dataBookStore.json');

test('Users can register with valid credentials', { tag: '@UserRegister' }, async ({ testContext }) => {
    //const { pageManager } = testInfo.testContext;
    const { pageManager } = testContext;
    const pageBooksSignUp = pageManager.getPageBooksSignUp();
    await pageBooksSignUp.goToBookingSignUpPage(dataBookStore.url);
    await pageBooksSignUp.signUpWithRandomData();
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.verifySignInWithRandomData();
});