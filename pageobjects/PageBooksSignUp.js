const { faker } = require("@faker-js/faker");
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const fs = require('fs');

class PageBooksSignUp {

    constructor(page) {
        this.page = page;
        this.username = page.locator("#username"); // Locator for the username input
        this.email = page.locator("#email"); // Locator for the email input
        this.password = page.locator("#password"); // Locator for the password input
        this.confirmPassword = page.locator("#password2"); // Locator for the confirm password input
        this.signUp = page.locator("#submit"); // Locator for Sign Up button
    }

    // Method to navigate to the sign Up booking page
    async goToBookingSignUpPage(url) {
        await this.page.waitForLoadState('networkidle');
        await this.page.goto(url + "/user/signup");
        await this.page.waitForLoadState('networkidle');
    }

    // Method to sign up with random values
    async signUpWithRandomData() {       
        const randomUsername = faker.internet.username();
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();
        dataBookStore.registerUserName = randomUsername;
        dataBookStore.registerEmail = randomEmail;
        dataBookStore.registerPassword = randomPassword;
        await this.username.fill(dataBookStore.registerUserName);
        await this.email.fill(dataBookStore.registerEmail);
        await this.password.fill(dataBookStore.registerPassword);
        await this.confirmPassword.fill(dataBookStore.registerPassword);
        await this.signUp.click();

        fs.writeFileSync('../PlaywrightBookstore/utils/dataBookStore.json', JSON.stringify(dataBookStore, null, 2));

        return { registerEmail: randomEmail, registerPassword: randomPassword };
    }


}

module.exports = { PageBooksSignUp };