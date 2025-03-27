const { expect } = require('@playwright/test');

class PopupHelper {
    constructor(page) {
        this.page = page;
    }

    // Method to block ads on the page
    async blockAds(page) {
        await page.route('**/*', async (route) => { 
            try {
                const blockedUrls = [
                    'googleads.',
                    'doubleclick.net',
                    'adservice.google.',
                    'ads.yahoo.',
                    'bingads.',
                ];

                const requestUrl = route.request().url(); 

                if (blockedUrls.some(domain => requestUrl.includes(domain))) {
                    await route.abort();
                    //console.log(`Blocked ad: ${requestUrl}`);
                } else {
                    await route.continue();
                }
            } catch (error) {
                console.log('Error handling request:', error);
            }
        });
    }
}

module.exports = PopupHelper;
