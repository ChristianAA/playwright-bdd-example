import { test as base, createBdd } from 'playwright-bdd';
import { Config } from './config';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { fileURLToPath } from 'url';
import type { Page, Browser, BrowserContext } from 'playwright';
import type { Pages } from './pages.types';

chromium.use(StealthPlugin());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IPageClass {
    new (page: Page, world?: any): any;
}

class World {
    pages: Pages = {} as Pages;
}

const PageClasses: Record<string, IPageClass> = {};

async function loadPagesFromDirectory(dir: string) {
    if (!fs.existsSync(dir)) return;

    const pageFiles = fs.readdirSync(dir).filter(f => f.endsWith('Page.ts') || f.endsWith('Actions.ts'));

    for (const file of pageFiles) {
        const filePath = path.join(dir, file);
        const imported = await import(filePath);

        const PageClass = Object.values(imported).find(
            v => typeof v === 'function' && (v.name.endsWith('Page') || v.name.endsWith('Actions'))
        ) as IPageClass;

        if (!PageClass) {
            console.warn(`Skipping ${file} because it does not export a Page or Actions class.`);
            continue;
        }

        const baseName = file.replace('.ts', '');
        const key = baseName.charAt(0).toLowerCase() + baseName.slice(1);

        PageClasses[key] = PageClass;
    }
}

const basePagesDir = path.join(__dirname, '../pages');
await loadPagesFromDirectory(basePagesDir);

const test = base.extend<{
    world: World;
    pages: Pages;
    browser: Browser;
    context: BrowserContext;
    page: Page;
}>({
    browser: async ({}, use) => {
        const browser = await chromium.launch({
            headless: true,
            args: ['--start-maximized'],
        });
        await use(browser);
        await browser.close();
    },

    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            viewport: null,
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        });
        await use(context);
        await context.close();
    },

    world: async ({}, use) => {
        const world = new World();
        await use(world);
    },

    page: async ({ context }, use, testInfo) => {
        console.log(`▶ Starting scenario: ${testInfo.title}`);

        const page = await context.newPage();
        await page.goto(Config.BASE_URL);
        await use(page);

        console.log(`✔ Scenario "${testInfo.title}" finished with status: ${testInfo.status}`);
    },

    pages: async ({ page, world }, use) => {
        const instances = {} as Pages;

        for (const [name, PageClass] of Object.entries(PageClasses)) {
            const instance = new PageClass(page, world);

            (instances as any)[name] = instance;
        }

        world.pages = instances;
        await use(instances);
    },
});

export const { Given, When, Then, Before, After, BeforeAll, AfterAll } = createBdd(test);
export { test };
