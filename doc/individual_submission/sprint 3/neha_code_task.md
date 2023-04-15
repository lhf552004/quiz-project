## Documentation for Individual Submission Sprint 3

### **1. Created Dynamic UI for Manage Quiz Page**

- Created the dynamic UI for Mange Quiz Page. This is the UI for Admin to edit, delete and add new quiz.

- Edit , Delete and Add new quiz functionality is not implimented in this sprint. It will be done in the next sprint.

- The UI is properly rendered with the specific list of questions quizzes of perticular quiz.

**Steps to view this page:**

1. run `npm install`
2. run `node serve.js`
3. Hit below urls on browser.
4. URL to view Maths page: `http://localhost:3000/quiz/Maths/quiz-admin#`
5. URL to view GK Quiz Page: `http://localhost:3000/quiz/GK/quiz-admin#`

[Pull Request](https://github.com/MUN-COMP6905/project-eteam/pull/196)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/172)

[manageQuizAdmin.pug](/views/manageQuizAdmin.pug)

### **2. Created Dynamic User Dashboard**

- In Sprint 2 the UI for User Dashboard was hardcoded. Hence in this sprint I made the UI dynamic, where the user can navigate to quiz page to give the specific quiz by click on the particular quiz name link.

- Analyze, Preview and logout functionality are not implemented in this this sprint. This will be done in future sprint. 

**Steps to view this page:**

1. run `npm install`
2. run `node serve.js`
3. Hit below url on browser.
4. URL to view this page: `http://localhost:3000/users/dash-board/1`

[Pull Request](https://github.com/MUN-COMP6905/project-eteam/pull/178)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/131)

[userDashboard.pug](/views/userDashboard.pug)

### 3. Regression Test for Create Account Page

I created a UI regression test for the User Dashboard Page to make sure all the headers, list if quizzes, and Analyze, Preview links for ever quiz are displayed properly. I have used mocha to create the test for this page. 

The things that are need to be checked by the test:
- Should have all the headings proper

- Should disply all the lst of quizzes

- Should have analysis and preview links for each quiz

- Once all the Test are passed you should find below success on terminal:

```
  User DashBoard Page
    ✔ should have the "Dashboard" heading (48ms)
    ✔ should have the welcoming content
    ✔ should have instruction paragraph content" text
Below are the list of 4 quiz names displayed on the User Dashboard:
[ 'GK', 'History Quiz', 'Hollywood', 'Maths' ]
    ✔ should display list of quizzes fetched via loop
    ✔ should have data analysis and preview links for each quiz


  5 passing (7s)
```
**Steps to run my test:** 

1. Open terminal
2. Run command: npm install
3. Run command: node serve.js
4. Open new terminal(do not close the 1st terminal where Server is listening) and run command: `npx mocha test/userDashboardpage.js`

[Pull Request](https://github.com/MUN-COMP6905/project-eteam/pull/213)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/217)


