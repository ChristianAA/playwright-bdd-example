[![Daily Playwright Tests](https://github.com/ChristianAA/playwright-bdd-example/actions/workflows/daily-test.yml/badge.svg)](https://github.com/ChristianAA/playwright-bdd-example/actions/workflows/daily-test.yml)

# Playwright + playwright-bdd + Typescript Example

This repository contains the base setup of an UI testing project, using Playwright + playwright-bdd + Typescript

A simple search in DuckDuckGo to check that results are displayed is used as example

# Requirements

The minimum requirements are:

- node 24.11.0
- npm 11.6.1

# Setup

1. Download or clone the repository
2. Open a terminal
3. Go to the path of the "package.json" file and execute:

```
npm install
npx playwright install
npx playwright install-deps
```

# Test Execution

To run the tests in headless mode, go to main directory and execute:

```
npm run test
```

Check other execution options in the "scripts" section of the "package.json" file.

# Results

Once the execution (only with 'npm run test') has finished:

A cucumber report will be generated in the '/results/playwright-report.json' file.

An html report will also be generated in the '/results/playwright-report.html' file.

# Links

- [Playwright](https://playwright.dev/)
- [Playwright BDD](https://vitalets.github.io/playwright-bdd/#/)
- [Cucumber/Gherkin](https://cucumber.io/docs/gherkin/)
