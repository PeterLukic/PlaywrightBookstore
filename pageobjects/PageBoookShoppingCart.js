const { expect } = require("@playwright/test");


class PageBoookShoppingCart {
    constructor(page) {
        this.page = page;
        this.buttonProceedToCheckout = page.locator(".btn.btn-expand.w-100.mt-3"); // Locator for the 'Proceed to Checkout' button
        this.cartRows = page.locator('table.table tbody tr'); // Locator for the rows in the cart
        this.cartItemName = (row) => row.locator('.information').nth(0); // Locator for the item name
        this.cartItemDescription = (row) => row.locator('.information').nth(1); // Locator for the item description
        this.cartItemQuantity = (row) => row.locator('input#cartQty'); // Locator for the item quantity
        this.cartItemPrice = (row) => row.locator('td span.fw-bold'); //  Locator for the item price
    }

    // Navigate to the shopping cart page
    async goToPageBoookShoppingCart(url) {
        await this.page.goto(url + "/cart");
        await this.page.waitForLoadState('networkidle');
    }

    async clickButtonProceedToCheckout() {
        await this.buttonProceedToCheckout.click();
    }

    // Verify all items in the cart
    async verifyCartItems() {
        const rowCount = await this.cartRows.count();
        for (let i = 0; i < rowCount; i++) {           
            const row = this.cartRows.nth(i);
            const name = await this.cartItemName(row).evaluate(el => el.childNodes[0].textContent.trim());
            const description = await this.cartItemDescription(row).textContent();
            const quantity = await this.cartItemQuantity(row).inputValue();
            const price = await this.cartItemPrice(row).textContent();
            expect(name).not.toBeNull();
            expect(name.trim().length).toBeGreaterThan(0);
            expect(description).not.toBeNull();
            expect(description.trim().length).toBeGreaterThan(0);
            expect(parseInt(quantity)).toBeGreaterThan(0); 
            expect(price).not.toBeNull();
            expect(price.trim().length).toBeGreaterThan(0);
        }
    }
}

module.exports = { PageBoookShoppingCart };


