# Term Project COMP 6905 Winter 2023

## Team description

[Member roles definition](./doc/memberroles.md) **Updated to align with roles for sprint 2**

## Project Description

1. This project adopts the express.js framework and view engine pug.
2. The persistence is implemented through the database, maybe firebase.
3. Quiz test system, with user management and quiz management
4. At assignment 2 sprint, the quiz system could offer new student signup, login, quiz page with mock data

## Instructions
Start: 

    node .\serve.js 

Home: http://localhost:3000/

Quizs: http://localhost:3000/quiz

Quiz: http://localhost:3000/quiz/GK

Signup: http://localhost:3000/users/create

Login: http://localhost:3000/users/login

User Dashboard: http://localhost:3000/users/dash-board/1

User Admin: http://localhost:3000/users/admin/:id

## Routers doc: **New document from sprint 2**

Quiz: [Quiz Router](./doc/routers/quizRouter.md)

QuizItem: [QuizItem Router](./doc/routers/quizItemRouter.md)

User: [User Router](./doc/routers/userRouter.md)

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

[quizbank.test.mjs](/test/quizbank.test.mjs)

[user.test.mjs](/test/user.test.mjs)

[userRouter.test.mjs](/test/userRouter.test.mjs)

### Tests for UI Pages
Please prefer to instruction docs to run tests 

[/test/createAccountPage.js](/test/createAccountPage.js) | [Test Instructions](/doc/individual_submission/sprint%202/neha_code_task.md)

[/test/quizPage.js](/test/quizPage.js) | [Test Instruction](/doc/individual_submission/sprint%202/trangv_code_task_doc.md)

## Structure Design
[Front-End Structure Design](/doc/frontendstructuredesign.md)

[Full Structure Design](https://github.com/MUN-COMP6905/project-eteam/blob/dev/doc/structuredesign.md)

## Code Style
[Nodejs Code style External Resources](https://github.com/felixge/node-style-guide)

[CSS Code Style](/doc/csscodestyle.md) **New document from sprint 2**

## Code Review Standard

[Team Code Review Standard](/doc/codereviewstandard.md)

[Code Review Checklist](/doc/codereviewchecklist.md) **Updates for sprint 2**

[Code Review Standard External Resources](https://google.github.io/eng-practices/review/reviewer/standard.html)

## Source submission process

[Source submission process](/doc/sourcesubmission.md)

## Team Schedule process

[Process schedule](/doc/processSchedule.md)

## Scrum meetings

[Sprint 1 Meetings](/doc/sprint-1-meetings.md)

[Sprint 2 Meetings](/doc/sprint-2-meetings.md) **New document from sprint 2**

## Team members tasks status

[Teammember tasks status](/doc/teammember-tasks-status.md)

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
