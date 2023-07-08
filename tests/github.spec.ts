import { test, expect } from '@playwright/test';
import { TabsComponent } from '../pages/tabs.component';
import { RepositoriesComponent } from '../pages/repositories.component';
import { RepositoryPage } from '../pages/repository.page';
import { data } from '../data/github.data';

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
        const repoTabCount = await tabs.getNumberOfRepositories()
        expect.soft(repoTabCount, "Repository counts matches expected value").toEqual(data.repositoryCount)
    })

})


