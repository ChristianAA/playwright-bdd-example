import type { Page } from 'playwright';
import type { Pages } from '../support/pages.types';

export class BasePage {
    protected page: Page;
    protected world?: any;

    constructor(page: Page, world?: any) {
        this.page = page;
        this.world = world;
    }

    protected get pages(): Pages {
        return this.world?.pages as Pages;
    }
}
