import { Given, When } from '@support/fixture';

Given('I am on the DuckDuckGo homepage', async ({ pages }) => {
    await pages.searchPage.assertSearchPage();
});

When('I search for {string}', async ({ pages }, searchQuery: string) => {
    await pages.searchPage.searchResults(searchQuery);
});
