import { Locator, Page } from '@playwright/test';

export class RepositoriesComponent {
    readonly page: Page;
    readonly publicRepositories: Locator;
    readonly searchInput: Locator;
    readonly languageDropdownButton: Locator;
    readonly sortDropdownButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.publicRepositories = page.locator('//*[@class="Box"]/ul/li')
        this.searchInput = page.locator("#your-repos-filter")
        this.languageDropdownButton = page.getByRole('button', { name: 'Language' })
        this.sortDropdownButton = page.getByRole('button', { name: 'Sort' })
    }

    async getRepositoriesCardsCount(): Promise<number> {
        return await this.publicRepositories.count()
    }

    async navigateByIndex(index: number) {
        await this.publicRepositories.nth(index).click()
    }

    async selectLastRepository(): Promise<string> {
        const repositoryName = this.publicRepositories.last().locator('//*[@data-hovercard-type="repository"]').innerText()
        await this.publicRepositories.last().locator('//*[@data-hovercard-type="repository"]').click()
        await this.page.waitForLoadState('networkidle')
        return repositoryName
    }

    async getNames(): Promise<string[]> {
        const names: string[] = []
        for await (const card of await this.publicRepositories.all()) {
            names.push(await card.locator('//*[@data-hovercard-type="repository"]').innerText())
        }
        return names
    }

    async filterByLanguage(language: string) {
        await this.languageDropdownButton.click()
        const responsePromise = this.page.waitForResponse(response => response.url().includes('language='));
        await this.page.getByRole('menuitemradio', { name: language }).click()
        const response = await responsePromise;
        await response.finished()
    }

    async sortBy(order: string) {
        await this.sortDropdownButton.click()
        const responsePromise = this.page.waitForResponse(response => response.url().includes('sort='));
        await this.page.getByRole('menuitemradio', { name: order }).click()
        const response = await responsePromise;
        await response.finished()
    }
}