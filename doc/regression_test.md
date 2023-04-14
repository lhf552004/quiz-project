# Available Regression Tests

Test file names reflect the components that it's testing for 

First step, 

`npm install` to make sure all dependencies are installed (only need to run once)

How to run tests 

`npx mocha --exit` 

to run single test 

`npx mocha /test/test_file_name.js`

NOTE: Test for `createAccountPage.js` and `userDashboardPage.js` will show as fail because it has slightly different steps than other tests. The dev for those tests has been advised to update the test to match with team test style in future sprint.

For `createAccountPage.js` and `userDashboardPage.js`

1. Run `node serve.js` in one terminal 
2. Do no close the terminal in step #1 
3. Run `npx mocha test/createAccountPage.js test/userDashboardPage.js` 
4. NOTE: create an account task might fail if the test has run before. Also advised to remove user after test in a code review. 

## Available tests for modules and routers

We are using mocha with the help of chai to make request and puppeteer to run as a shadow browser for UI Tests

[quizbank.test.mjs](/test/quizbank.test.mjs)

[user.test.mjs](/test/user.test.mjs)

[userRouter.test.mjs](/test/userRouter.test.mjs)

[quizRouter.test.mjs](/test/quizRouter.test.mjs)

[quizItemRouter.test.mjs](/test/quizItemRouter.test.mjs)

[homeRouter.test.mjs](/test/homeRoute.test.mjs)

[server.test.mjs](/test/server.test.mjs)


## Available tests for UI Pages

[createAccountPage.js](/test/createAccountPage.js)

[quizPage.js](/test/quizPage.js)

[createQuizItem.js](/test/createQuizItem.js)

[createQuizModal.js](/test/createQuizModal.js)

## In progress test 

[login-page-test.js] Still in PR review waiting for dev to fix the issues with test [PR](https://github.com/MUN-COMP6905/project-eteam/pull/166)