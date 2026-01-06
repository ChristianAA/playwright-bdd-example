import { BasePage } from '@pages/basePage';
import { domInteractionsUtils } from '@utils/domInteractionsUtils';
import { locators } from '@utils/locators';
import { visibilityUtils } from '@utils/visibilityUtils';

export class SearchPage extends BasePage {
    constructor(page: Page, world?: World) {
        super(page, world);
        this.locators = locators.search;
    }

    async assertSearchPage(): Promise<void> {
        await visibilityUtils.assertElementIsVisible(this.page, this.locators.searchInput);
    }

    async searchResults(text: string): Promise<void> {
        await domInteractionsUtils.clearInputAndType(this.page, this.locators.searchInput, text);
        await domInteractionsUtils.click(this.page, this.locators.searchButton);
    }
}
