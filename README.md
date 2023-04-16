# Term Project COMP 6905 Winter 2023

## Team description

[Member roles definition](./doc/memberroles.md)

## Project Description

1. This project adopts the express.js framework and view engine pug.
2. The persistence is implemented through the database, maybe firebase.
3. Quiz test system, with user management and quiz management
4. In sprint 1, the quiz system could offer new student signup, login, quiz page with mock data
5. In sprint 2, there are multiple updates to the features of the project. We also provide multiple regression tests for our UI, modules and routers. 
6. In sprint 3, more features are added. We also provide more tests for out built components and documentations for architecture and alt-architecture

## Instructions
Start: 

    node .\serve.js 

Home: http://localhost:3000/

Quizs: http://localhost:3000/quiz

Quiz: http://localhost:3000/quiz/GK

Signup: http://localhost:3000/users/create

Login: http://localhost:3000/users/login

User Dashboard: http://localhost:3000/users/dash-board/:id (id is the parameter, use id = 1 for demo)

User Admin: http://localhost:3000/users/admin/:id (id is the parameter, use id = 1 for demo)

Add quiz item http://localhost:3000/quizitem/quiz/:name/add-quiz-item (name is the parameter)

Quiz Manage Admin http://localhost:3000/quiz/:name/quiz-admin (name is parameter)
- Replace ':name' with GK to get perfect view [View GK Quiz](http://localhost:3000/quiz/GK/quiz-admin#)

## Overall Project Implementation State

[Implementation State](./doc/implementationState.md)

## Routers doc:

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

## Regression/Unit Tests 

Test file names reflect the component that it's for. Please read the doc below for instruction and available tests

[Regression Test Documentation](./doc/regression_tests.md)

## Architeture Docs
[Architecture Docs](/doc/architecture.md)

[Alternative Architecture Docs](/doc/alt-architecture.md)

## Code Style
[Nodejs Code style External Resources](https://github.com/felixge/node-style-guide)

[Internal CSS Code Style](/doc/csscodestyle.md)

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

[Sprint 3 Meetings](/doc/sprint-3-meetings.md)

## Team members tasks status for ALL SPRINTS

[Teammember tasks status](/doc/teammember-tasks-status.md) 

## Performance Review of Each Team-Member

[Performance Review Sprint 1](/doc/performance_review_sprint1.md)

[Performance Review Sprint 2](/doc/performance_review_sprint2.md)

[Performance Review Sprint 3](/doc/performance_review_sprint3.md)

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
