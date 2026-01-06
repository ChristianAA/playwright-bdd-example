import { expect, type Page } from '@playwright/test';
import { Config } from '@support/config';

export const visibilityUtils = {
    async assertPageTitle(page: Page, expectedTitle: string, timeout: number = Config.DEFAULT_TIMEOUT): Promise<void> {
        const title: string = await page.title();
        await expect(title).toContain(expectedTitle);
    },

    async assertElementIsVisible(
        page: Page,
        selector: string,
        timeout: number = Config.DEFAULT_TIMEOUT
    ): Promise<void> {
        await page.locator(selector).waitFor({ state: 'visible', timeout });
    },

    async assertTotalElements(page: Page, selector: string, expectedCount: number): Promise<void> {
        await expect(page.locator(selector)).toHaveCount(expectedCount);
    },
};
