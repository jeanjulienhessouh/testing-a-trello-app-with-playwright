import { type Locator, type Page } from '@playwright/test';

export class GetStartedPage {
    // ...
    readonly page: Page;
    readonly boardTitle: Locator;
    readonly enterListTitle: Locator;
    readonly boardLists: Locator
}