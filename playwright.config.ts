import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddConfig = defineBddConfig({
    paths: ['src/features/**/*.feature'],
    require: ['src/steps/**/*.ts', 'src/support/**/*.ts'],
});

export default defineConfig({
    testDir: bddConfig,
    reporter: [
        [
            'html',
            {
                outputFolder: 'results/playwright-report',
                open: 'never',
            },
        ],
        ['json', { outputFile: 'results/cucumber-report.json' }],
        ['list'],
    ],
    workers: 1,
});
