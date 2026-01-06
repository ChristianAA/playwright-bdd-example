import { Then } from '@support/fixture';

Then('the title of the page should be {string}', async ({ pages }, expectedTitle: string) => {
    await pages.resultsPage.assertTitle(expectedTitle);
});

Then('I should see search results', async ({ pages }) => {
    await pages.resultsPage.assertResults();
});
