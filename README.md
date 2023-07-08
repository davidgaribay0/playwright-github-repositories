# playwright-github-repositories

## Prerequisites
- node & npm
- git

## Installation
- Clone the repo using the following command: `git clone https://github.com/davidgaribay0/playwright-github-repositories.git`
- Navigate to folder using `cd playwright-github-repositories`
- Install all dependencies `npm i`
- From the same folder you are in run the playwright tests using `CI=false npx playwright test`

## Options
- If you would like to see the tests in headed mode run the following command `CI=false npx playwright test --headed`
- If you would like to see the tests in non-headed mode run the following command `CI=false npx playwright test`

## Project structure
- This repository follows the Page Object Model (POM) and utilizes playwright and typescript to create automation test cases.
- The framework is data driven and most of the parameters are located the [github.data.ts file](data/github.data.ts), this helps avoid hardcoding test data into test specs for easier mantainability. 
- If you would like to run in CI mode pass in the flag CI=true before the playwright command example: `CI=true npx playwright test`
