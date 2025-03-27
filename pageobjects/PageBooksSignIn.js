const { expect } = require("@playwright/test");
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));

class PageBooksSignIn {

    constructor(page) {
        this.page = page;
        this.email = page.locator("#email"); // Locator for the email input
        this.password = page.locator("#password"); // Locator for the password input
        this.signIn = page.locator("#submit"); // Locator for Sign In button
        this.signInLabel = page.locator('//h1[@class="mt-3"]'); // Locator for the Sign In label
    }

    // Method to navigate to the sign In booking page
    async goToBookingSignInPage(url) {
        await this.page.waitForLoadState('networkidle');
        await this.page.goto(url + "/user/signin");
        await this.page.waitForLoadState('networkidle');
    }

    // Method to sign in with email and password 
    async signInWithEmailAndPassword(registerEmail, registerPassword) {
        await this.email.fill(registerEmail);
        await this.password.fill(registerPassword);
        await this.signIn.click();
    }

    // Method to verify if the user is on the sign In page
    async verifySignInWithRandomData() {
        await expect(this.page).toHaveURL(dataBookStore.url + '/user/signin');
        const labelSignIn = await this.signInLabel.innerText();
        expect(labelSignIn).toBe('Sign in');
    }



}

module.exports = { PageBooksSignIn };

