import { test, expect } from '@playwright/test';
import { TabsComponent } from '../pages/tabs.component';
import { RepositoriesComponent } from '../pages/repositories.component';
import { RepositoryPage } from '../pages/repository.page';
import { data } from '../data/github.data';
import { isSortedAlphabetically } from '../utils/utils';

test.describe.parallel('Github Test Suite', async () => {
    let tabs: TabsComponent
    let repositories: RepositoriesComponent
    let repositoryPage: RepositoryPage

    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        await page.waitForLoadState('networkidle')
        tabs = new TabsComponent(page);
        repositories = new RepositoriesComponent(page)
        repositoryPage = new RepositoryPage(page)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('Verify repositories equals expected amount', async () => {
        const repoTabCount: number = await tabs.getNumberOfRepositories()
        expect.soft(repoTabCount, "Repository counts matches expected value").toEqual(data.repositoryCount)
    })

    test(`Verify filtered ${data.filterLanguage} repositories count equals expected amount`, async () => {
        await repositories.filterByLanguage(data.filterLanguage)
        expect.poll(async () => { return await repositories.getRepositoriesCardsCount() }, { message: "Filtered repository counts matches expected value", timeout: 5000 })
            .toEqual(data.filteredRepositoryCount)
    })

    test('Verify sorted repositories alphabetically', async () => {
        await repositories.sortBy(data.sortBy)
        const repositoryNames: string[] = await repositories.getNames()
        expect.soft(isSortedAlphabetically(repositoryNames), "Sorted by alphabetical order").toBe(true)
    })

    test('Select last respository in the list and verify https clone url', async () => {
        await repositories.sortBy(data.sortBy)
        const repositoryName: string = await repositories.selectLastRepository()
        const httpsCloneUrl = await repositoryPage.getHTTPSCloneUrl()
        expect.soft(httpsCloneUrl.includes(repositoryName), "HTTPS clone link matches repository clicked on").toBe(true)
    })

})
