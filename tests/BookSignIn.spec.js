const { test } = require('../utils/hooks'); 
const dataBookStore = require('../utils/dataBookStore.json');

test('Users can log in with registered credentials', { tag: '@UserLoginRegister' }, async ({ testContext }) => {
    const { pageManager } = testContext;
    const pageBooksSignUp = pageManager.getPageBooksSignUp();
    await pageBooksSignUp.goToBookingSignUpPage(dataBookStore.url);
    await pageBooksSignUp.signUpWithRandomData();
    const pageBooksSignIn = pageManager.getPageBooksSignIn();
    await pageBooksSignIn.signInWithEmailAndPassword(dataBookStore.registerEmail, dataBookStore.registerPassword);
    const pageBooksProfile = pageManager.getPageBooksProfile();  
    await pageBooksProfile.verifyProfileWithRandomData();
});
