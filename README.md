# Term Project COMP 6905 Winter 2023

## Team description

[Member roles definition](./doc/memberroles.md)

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

Quiz: http://localhost:3000/quiz/1 | [Individual README](/doc/individual_submission/trangv_code_task.md)

Signup: http://localhost:3000/users/create | [Individual README](/doc/individual_submission/neha_code_task.md)

Login: http://localhost:3000/users/login


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

## Structure Design
[Front-End Structure Design](/doc/frontendstructuredesign.md)

[Full Structure Design](https://github.com/MUN-COMP6905/project-eteam/blob/dev/doc/structuredesign.md)

## Code Style
[Nodejs Code style External Resources](https://github.com/felixge/node-style-guide)

## Code Review Standard

[Team Code Review Standard](/doc/codereviewstandard.md)

[Code Review Checklist](/doc/codereviewchecklist.md)

[Code Review Standard External Resources](https://google.github.io/eng-practices/review/reviewer/standard.html)

## Source submission process

[Source submission process](/doc/sourcesubmission.md)

## Team Schedule process

[Process schedule](/doc/processSchedule.md)

## Scrum meetings

[First Meeting](/doc/first-meeting.md)

[Second Meeting](/doc/second-meeting.md) Notes are avaliable in file "second-meeting.md"

[Fourth Meeting]([/doc/fourth-meeting.md](https://github.com/MUN-COMP6905/project-eteam/blob/dev/doc/fourth-meeting.md)) Notes are avaliable in file "fourth-meeting.md"

## Team members tasks status

[Teammember tasks status](/doc/teammember-tasks-status.md)

## Performance Review of Each Team-Member

[Performance Review](/doc/performancereview.md)

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
