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

Quiz: http://localhost:3000/quiz/1 [Individual README](/doc/individual_submission/trangv_code_task.md)

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
[Front-End Structure Design](/doc/frontendstructuredesign.md)
[Structure Design](/doc/structuredesign.md)

## Code Style
[Nodejs Code style](https://github.com/felixge/node-style-guide)

## Code Review Standard

[Team Code Review Standard](/doc/codereviewstandard.md)
[Code Review Standard External Resources](https://google.github.io/eng-practices/review/reviewer/standard.html)

## Source submission process

[Source submission process](/doc/sourcesubmission.md)

## Team Schedule process

[Process schedule](/doc/processSchedule.md)

## Scrum meetings

[First Meeting](/doc/first-meeting.md)

[Second Meeting](/doc/second-meeting.md) Notes are avaliable in file "second-meeting.md"

## Team members tasks status

[Teammember tasks status](/doc/teammember-tasks-status.md)

## Performance Review of Each Team-Member

The Performance Review of Each Team-Member can be seen in the mentioned link: [Sprint Performance Review](https://docs.google.com/spreadsheets/d/1Gm-qb7FD2baLD-eDKrLjbsh3EBmGTTs08O_xN5u_UjA/edit?resourcekey#gid=104030491)
1.	The above link is of a google spreedsheet which consist of all the details on performance review given by each team member to every other team member.

2.	To give review amongst team members, we have used the google form to submit the response of every team member's performance review.
    1.	Here is the link of the google form we have used for submitting the performance review: (https://forms.gle/7i1mr95kcYGPdRed6)
    2.	from this form the name, email id, the name of team member to whom he/she is reviewing (selected from the dropdown), and few question related to performance review is recorded.
    3.	On submission of this form the records are generated in the google spreedsheet.

3.	This spreedsheet we are maintaining for recording performance review and keeping track on the performance of every team member.

4.	This can be helpful in getting feedback for the particular member in the team and analysing the performance of the team.

5.	From the recorded response in google spreedsheet, following points can be recognised as improvements need to be done as a team:
    1.	As a team, needs to put more efforts on the technology we are using.
    2.	Need to follow the deadline and submit it on time.  
    3.Understandability of the requirement should be improved.
    4.	Communication and involvement in the meeting should be shown up.
    5.	The contribution in documenting and creation of documents should be improved.

6. This process of documenting and recording the performance with the help of google form and spreedsheet will help in improving the team performance and realising where the team is lagging as a whole and can be handled it appropriately. 

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

### If you guys cite some tech or code, please write here
