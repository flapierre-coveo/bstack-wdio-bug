describe('webdriver.io page', () => {
    it('should have the right title', async () => {
        await browser.url('https://www.google.com');
        
        await browser.$('#idonotexist');

        await (await browser.$('#main')).waitForExist(30e3);
    });
});