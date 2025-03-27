const { expect } = require("@playwright/test");

class PageBooksDetails {

    constructor(page) {
        this.page = page;
        this.bookTitle = page.locator("//div[@class='col-xl-6 col-md-6 col-sm-6 pl-4']/h3"); // Locator for the book title
        this.bookPrice = this.page.locator("//div[@class='col-xl-6 col-md-6 col-sm-6 pl-4']/p[1]/span"); // Locator for the book price
        this.bookDescription = this.page.locator("//div[@class='col-xl-6 col-md-6 col-sm-6 pl-4']/p[2]"); // Locator for the book price
        this.buttonAddToCart = page.locator("a.btn.btn-danger"); // Locator for the 'Add to Cart' button
    }

    // Method click the 'Add to Cart' button
    async clickButtonAddToCart() {
        await this.buttonAddToCart.click();

    }

    // Method to verify book details
    async verifyBookDetails(title, price, description) {
        await this.page.waitForLoadState('networkidle');
        await expect(this.bookTitle).toHaveText(title);
        await expect(this.bookPrice).toHaveText(price);
        await expect(this.bookDescription).toHaveText(description);
    }
}

module.exports = { PageBooksDetails };