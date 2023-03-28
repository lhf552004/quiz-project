## Documentation for Individual Submission Sprint 2

### 1. Standardize CSS for the project 

After deciding the fixed styling pattern, I did style for User Dashboard Page according to the standardize CSS. Helped another team member in standardizing the CSS.

### 2. End to End connection of Create Account Page.

From sprint 1, user was not able to create the actual account and store its email id, password and id in database as it was just the UI implementation.
Now in second sprint I make sure the functionality works end to end for creating new user in cluck of Sign-Up button. 

Pull request for this task: [Pull Request](https://github.com/MUN-COMP6905/project-eteam/pull/115)

### 3. Creating UI of User Dashboard Page.

In this sprint I have created the UI for User Dashboard. The dashboard reflects the three different modules of quiz: Quiz A, Quiz B, Quiz C.

This quiz module will contain combination of different types of Quiz items related and specific to that quiz module. For Example, quiz item can be multiple choice question, select multiple answer question, Give one word answer in the textbox, etc.

Apart from that user will also have the facility to preview and get analyzation on his quiz.

Temporary URL to view this page: `http://localhost:3000/users/dash-board/1`

**Steps to view this page:**

1. run `npm install`
2. run `node serve.js`
3. Hit above url on browser.

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/117)

[Pull Request](https://github.com/MUN-COMP6905/project-eteam/pull/126)

[userDashboard.pug](/views/userDashboard.pug)

### 4. Regression Test for Create Account Page

I created a UI regression test for the Create Account Page to make sure all the place holders and links are displayed properly. I have used mocha to create the test for this page. 

The things that are need to be checked by the test:
- Correct page display
- The page has Email id field.
- The page has Password field.
- The page has `Already have an account? Login!` link.
- On click of SignUp button user should be redirected to the profile page(temporary). That is, the new user has been successfully created with its id.
- Once all the Test are passed you should find below success on terminal:

`Create Account Page`

`✔ should have an email field`

`✔ should have a password field`

`✔ should have 'Already have an account? Login!' link`

`New user is created successfully! Below is the user id of newly created user: `

`91767b11-a367-4f23-8c15-225b3ea8df3e`

`✔ Should create a new user (90ms)`

`4 passing (2s)`

**Note:** The test will not be runed correctly for second time, if user mentioned in "createAccountPage.js" file (test) is created successfully in first iteration. That user will be already created in 1st iteration.  

**Steps to run my test:** 

1. Open terminal
2. Run command: npm install
3. Run command: node serve.js
4. Hit `http://localhost:3000/` url on your browser. After you hit the url, please take a while to hit the below command, so that it can render the page and prevent it from timeout.
5. Open new terminal(do not close the 1st terminal where Server is listening) and run command: `npx mocha test/createAccountPage.js`

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/10)

[Pull Request](https://github.com/MUN-COMP6905/project-eteam/pull/145)

[createAccountPage.js](/test/createAccountPage.js)

### 5. UML Diagram

This is the UML diagram for User Dashboard Page which I have created in sprint 2: 

!["User Dashboard Page UML"](/doc/images/UserDashboardPageUML.png)
