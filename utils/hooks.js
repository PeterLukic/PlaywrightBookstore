const { test: base, expect } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const PopupHelper = require('../utils/PopupHelper');

const test = base.extend({
    testContext: async ({ page }, use) => {
        const popupHelper = new PopupHelper(page);
        await popupHelper.blockAds(page);

        const pageManager = new PageManager(page);
        await use({ pageManager }); // Pass the test context to the test
    }
});

module.exports = { test, expect };