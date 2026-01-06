import { BasePage } from '@pages/basePage';
import { locators } from '@utils/locators';
import { visibilityUtils } from '@utils/visibilityUtils';

export class ResultsPage extends BasePage {
    constructor(page: Page, world?: World) {
        super(page, world);
        this.locators = locators.results;
    }

    async assertTitle(expectedTitle: string): Promise<void> {
        await visibilityUtils.assertPageTitle(this.page, expectedTitle);
    }

    async assertResults(): Promise<void> {
        await visibilityUtils.assertElementIsVisible(this.page, this.locators.resultsContainer);
        await visibilityUtils.assertTotalElements(this.page, this.locators.totalResults, 10);
    }
}
