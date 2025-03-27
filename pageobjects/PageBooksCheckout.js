
class PageBooksCheckout {
    constructor(page) {
        this.page = page;
        this.name = page.locator("#name"); // Locator for name input
        this.address = page.locator("#address"); // Locator for address input
        this.cardHolderName = page.locator("#card-name"); // Locator for card holder name input
        this.creditCardNumber = page.locator("#card-number"); // Locator for credit card number input
        this.expirationMonth = page.locator("#card-expiry-month"); // Locator for expiration month input
        this.expirationYear = page.locator("#card-expiry-year"); // Locator for expiration year input
        this.cvc = page.locator("#card-cvc"); // Locator for cvv input
        this.buttonPurchase = page.locator('[data-testid="purchase"]'); // Locator for purchase button

    }

    async fillCheckoutForm(name, address, cardHolderName, creditCardNumber, expirationMonth, expirationYear, cvcNumber) {
        await this.name.fill(name);
        await this.address.fill(address);
        await this.cardHolderName.fill(cardHolderName);
        await this.creditCardNumber.fill(creditCardNumber);
        await this.expirationMonth.fill(expirationMonth);
        await this.expirationYear.fill(expirationYear);
        await this.cvc.fill(cvcNumber);
    }

    async clickButtonPurchase() {
        await this.page.waitForLoadState('networkidle');
        await this.buttonPurchase.click();
    }
}

module.exports = { PageBooksCheckout };
