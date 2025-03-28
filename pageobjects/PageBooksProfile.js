const { expect } = require("@playwright/test");
const dataBookStore = JSON.parse(JSON.stringify(require('../utils/dataBookStore.json')));
const fs = require('fs');

class PageBooksProfile {
    constructor(page) {
        this.page = page;
        this.labelWelcome = page.locator("#welcome-message");  // Locator for welcome message
        this.orderCards = page.locator('.card');  // Locator for all order cards on the profile page
        this.noOrdersMessage = page.locator('h2.text-center');  // Locator for "No Orders..." message
        this.dropdownButton = page.locator('#navbarDropdown');  // Locator for dropdown button
        this.logoutLink = page.locator('#logout');  // Locator for logout link
        this.flashMessage = page.locator("#flash-message"); // Locator for flash message
    }

    // Method click on the dropdown button
    async dropdownButtonClick() {
        await this.dropdownButton.waitFor({ state: 'visible' });
        await this.dropdownButton.click();
    }


    // Method to log out
    async logOutClick() {
        await this.logoutLink.waitFor({ state: 'visible' });
        await this.logoutLink.click();
    }


    // Method to extract order details and store them in the 'orders' array
    async extractOrderDetails() {

        await this.page.waitForSelector('body');

        const noOrdersVisible = await this.noOrdersMessage.isVisible();
        if (noOrdersVisible) {
            this.orders = [];
            return;
        }

        await this.page.waitForSelector('.card', { state: 'visible' });

        const orderDetails = await this.orderCards.evaluateAll(cards => {
            return cards.map(card => {
                const orderId = card.querySelector('.card-header b').textContent.trim();
                const bookTitle = card.querySelector('.list-group-item span[style="font-weight: 600;"]').textContent.trim();
                const price = card.querySelector('.badge').textContent.trim();
                return { orderId, bookTitle, price };
            });
        });

        this.orders = orderDetails;
    }

    // Method to verify profile with random data
    async verifyProfileWithRandomData() {
        await expect(this.page).toHaveURL(dataBookStore.url + '/user/profile');
        await expect(this.labelWelcome).toHaveText("Hello " + dataBookStore.registerUserName);
    }

    // Method to verify if the user logged in successfully
    async verifyUserLoggedText() {
        const labelDropdownButton = await this.dropdownButton.innerText();
        expect(labelDropdownButton).toBe(dataBookStore.username);
    }

    // Method to log the extracted order details
    async logOrderDetails() {
        console.log('Order Details:', this.orders);
    }

    // Method to verify that the orders are listed on the profile page
    async verifyOrdersListedCount() {
        const orderCardsCount = await this.orderCards.count();
        expect(orderCardsCount).toBeGreaterThan(0);
    }

    async verifyOrderDetails(orderId, bookTitle, price) {
        await this.page.waitForLoadState('networkidle');
        let orderFound = false;
        for (const order of this.orders) {
            if (order.orderId === orderId && order.bookTitle === bookTitle && order.price === price) {
                orderFound = true;
                break;
            }
        }
        expect(orderFound).toBe(true);
        if (!orderFound) {

            console.error(`Order ID ${orderId}, title "${bookTitle}", and price ${price} not found`);
        }

    }

    // Method to extract the order ID from the flash message after purchase
    async extractOrderIdFromFlashMessage() {
        await this.page.waitForLoadState('networkidle');
        await this.flashMessage.waitFor({ state: 'visible' });
        const flashMessageText = await this.flashMessage.textContent();
        const orderIdMatch = flashMessageText.match(/Reference ID: (\w+)/);
        if (orderIdMatch) {
            const orderId = orderIdMatch[1];
            const filePath = '../PlaywrightBookstore/utils/dataBookStore.json';
            dataBookStore.orderId = orderId;
            fs.writeFileSync(filePath, JSON.stringify(dataBookStore, null, 2));
            return orderId; // Return only the orderId
        } else {
            console.error('Order ID not found in flash message');
            return null; // Return null if orderId is not found
        }
    }

}

module.exports = { PageBooksProfile };
