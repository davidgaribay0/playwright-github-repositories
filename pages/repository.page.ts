import { Locator, Page } from '@playwright/test';

export class RepositoryPage {
    readonly page: Page;
    readonly codeDropdownButton: Locator;
    readonly httpsUrlInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.codeDropdownButton = page.locator('summary').filter({ hasText: 'Code' })
        this.httpsUrlInput = page.locator("//input[contains(@value, '.git')]")
    }

    async getHTTPSCloneUrl(): Promise<string> {
        await this.codeDropdownButton.click()
        return (await this.httpsUrlInput.inputValue())
    }
}