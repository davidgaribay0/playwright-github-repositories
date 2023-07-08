import { Locator, Page } from '@playwright/test';

export class TabsComponent {
    readonly page: Page
    readonly repositoriesLink: Locator
    readonly repositoriesCount: Locator

    constructor(page: Page) {
        this.page = page
        this.repositoriesLink = page.locator('//*[@data-tab-item="org-header-repositories-tab"]')
        this.repositoriesCount = this.repositoriesLink.locator('//*[@title="Not available"]')
    }

    async getNumberOfRepositories(): Promise<number> {
        await this.page.waitForTimeout(1000)
        return Number((await this.repositoriesCount.innerText()).trim())
    }

}