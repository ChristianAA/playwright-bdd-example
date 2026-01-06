import type { Page, Locator } from 'playwright';

export const domInteractionsUtils = {
    clearInputAndType: async (page: Page, selector: string, value: string): Promise<void> => {
        const locator = page.locator(selector);
        await locator.clear();
        await locator.fill(value);
    },

    click: async (page: Page, selector: string): Promise<void> => {
        await page.locator(selector).click();
    },
};
