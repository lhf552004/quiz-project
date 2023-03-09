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

Quiz: http://localhost:3000/quiz/1

Signup: http://localhost:3000/users/create

Login: http://localhost:3000/users/login


## Repository Structure

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

[Structure Design](/doc/structuredesign.md)

## Code Style
[Nodejs Code style](https://github.com/felixge/node-style-guide)

## Code Review Standard

[Code Review standard](https://google.github.io/eng-practices/review/reviewer/standard.html)

## Source submission process

[Source submission process](/doc/sourcesubmission.md)

## Team Schedule process

[Process schedule](/doc/processSchedule.md)

## Scrum meetings

[First Meeting](/doc/first-meeting.md)

[Second Meeting](/doc/second-meeting.md) Notes are avaliable in file "second-meeting.md"

## teammember-tasks status

[Teammember tasks status](/doc/teammember-tasks-status.md)

## Performance Review of Each Team-Member
[Sprint Performance Review](https://docs.google.com/spreadsheets/d/1Gm-qb7FD2baLD-eDKrLjbsh3EBmGTTs08O_xN5u_UjA/edit?resourcekey#gid=104030491)

## Attributions

Each line/entry of your attributions section should consist of three parts: (1) the source (such as web page URL, individual name, or bibliographic reference), (2) the nature of the contribution to your submission, and (3) any additional information (such as how the collaboration worked, or whether your collaborator is a classmate or student)

1. Attribution 1
   1. [Express home page](https://expressjs.com/)
   2. The nature of the contribution, it helps to use express to build a server using view engine
   3. N/A

2. Atrribution 2
    1. [Firebase Docs](https://firebase.google.com/docs)
    2. It helped in connecting webapp to firebase firestore.
    3. Some parts of methods or funtions are referenced from stackoverflow & W3school.

### If you guys cite some tech or code, please write here
