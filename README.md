# Term Project COMP 6905 Winter 2023

## Team description

[Member roles definition](./doc/memberroles.md) **Updated to align with roles for sprint 2**

## Project Description

1. This project adopts the express.js framework and view engine pug.
2. The persistence is implemented through the database, maybe firebase.
3. Quiz test system, with user management and quiz management
4. At assignment 2 sprint, the quiz system could offer new student signup, login, quiz page with mock data
5. At assignment 3 sprint, there are multiple updates to the features of the project. We also provide multiple regression tests for our UI, modules and routers. 

## Instructions
Start: 

    node .\serve.js 

Home: http://localhost:3000/

Quizs: http://localhost:3000/quiz

Quiz: http://localhost:3000/quiz/GK

Signup: http://localhost:3000/users/create

Login: http://localhost:3000/users/login

User Dashboard: http://localhost:3000/users/dash-board/:1 (id is the parameter)

User Admin: http://localhost:3000/users/admin/:id (id is the parameter)

Add quiz item http://localhost:3000/quizitem/quiz/:name/add-quiz-item (name is the parameter)

## Routers doc: **New document from sprint 2**

Quiz: [Quiz Router](./doc/routers/quizRouter.md)

QuizItem: [QuizItem Router](./doc/routers/quizItemRouter.md)

User: [User Router](./doc/routers/userRouter.md)

## Module doc

User: [User](./doc/modules/user.md)

QuizBank [QuizBank](./doc/Quizbank%20%26%20DB%20explanation.pdf)

## Repository Structure
  The main branch is dev
  
    api/
    doc/
    modules/
    public/
    routers/
    test/
    views/ 
    serve.js
    README.md

  The api folder is for fire store configuration

  The doc folder is for md documents

  The modules directory is for modules, such as quizbank

  The public directory is for static files

  The routers diectory is to define router 

  The test folder is to test files

  The view folder is for UI files, currently they are pug files

  serve.js the entrance file for node.js

  README file is the introduction for the project

## Regression/Unit Tests  **New from sprint 2**

Available tests from this sprint 

### Tests for modules and routers
We are using mocha with the help of chai to make request and puppeteer to run as a shadow browser for UI Tests

[quizbank.test.mjs](/test/quizbank.test.mjs): If you want to run this file separately, mention full path while running cmd. "/test/quizbank.test.mjs" 

[user.test.mjs](/test/user.test.mjs)

[userRouter.test.mjs](/test/userRouter.test.mjs)

[quizRouter.test.mjs](/test/quizRouter.test.mjs)

[quizItemRouter.test.mjs](/test/quizItemRouter.test.mjs)

### Tests for UI Pages
Please prefer to instruction docs to run tests 

[/test/createAccountPage.js](/test/createAccountPage.js) | [Test Instructions](/doc/individual_submission/sprint%202/neha_code_task.md)

[/test/quizPage.js](/test/quizPage.js) | [Test Instruction](/doc/individual_submission/sprint%202/trangv_code_task_doc.md)

## Architeture Docs
[Architecture Docs](/doc/architecture.md) **New document from sprint 3**

## Code Style
[Nodejs Code style External Resources](https://github.com/felixge/node-style-guide)

[CSS Code Style](/doc/csscodestyle.md)

## Code Review Standard

Code review is performed in all PR with codes about to be merged to dev branch. Each team member needs to run regression tests to make sure their codes will not break the main branch. The reviewer will then checkout the PR to make sure everything is working as expected and use the code review checklist as guideline. All review comments are posted in the discussion of our PRs. 

[Team Code Review Standard](/doc/codereviewstandard.md)

[Code Review Checklist](/doc/codereviewchecklist.md)

[Code Review Standard External Resources](https://google.github.io/eng-practices/review/reviewer/standard.html)

## Source submission process

[Source submission process](/doc/sourcesubmission.md)

## Team Schedule process

[Process schedule](/doc/processSchedule.md)

## Scrum meetings

[Sprint 1 Meetings](/doc/sprint-1-meetings.md)

[Sprint 2 Meetings](/doc/sprint-2-meetings.md)

[Sprint 3 Meetings](/doc/sprint-3-meetings.md) **New document from sprint 3**

## Team members tasks status

[Teammember tasks status](/doc/teammember-tasks-status.md) **Updates to include status of all sprints**

## Performance Review of Each Team-Member

[Performance Review Sprint 1](/doc/performance_review_sprint1.md)

[Performance Review Sprint 2](/doc/performance_review_sprint2.md)

## Attributions

Each line/entry of your attributions section should consist of three parts: (1) the source (such as web page URL, individual name, or bibliographic reference), (2) the nature of the contribution to your submission, and (3) any additional information (such as how the collaboration worked, or whether your collaborator is a classmate or student)

1. Attribution 1
   1. [Express home page](https://expressjs.com/)
   2. The nature of the contribution, it helps to use express to build a server using view engine
   3. N/A

2. Attribution 2
    1. [Firebase Docs](https://firebase.google.com/docs)
    2. It helped in connecting webapp to firebase firestore.
    3. Some parts of methods or funtions are referenced from stackoverflow & W3school.

3. Attribution 3
    1. [Pug Docs](https://pugjs.org/api/getting-started.html)
    2. Templating framework to create UI of the webapp
    3. Learned some of the syntax for PUG from stackoverflow and PUG Docs

4. Attribution 4
    1. Various lectures about coding format and principles
    2. Inspiration to create code review checklist
