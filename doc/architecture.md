# Project Architecture

## Component Architecture
Our project is a structure of multiple components as "building blocks". 

The project stack contains multiple services and platforms. 

Our stack is described in this doc file with diagram and explanation for quizbank module [Structure Design Doc](/doc/structuredesign.md)

Discussion on functionality features that our components have achieved:
1. Reusability: Our quizbank module can be reuse with any application. The new application just need to make sure to build an API to accomodate and use the calsses and methods from the module. It can even be used without a user interface. 
2. Extensibility: All of our components are built to connect with each other easily. 
3. Replaceability: The front-end components of the project can easility be place with only the effort of rebuilding or updating to the current build. 
4. Encapsulation: The Express.js routers ONLY sees the interface of quizbank module. It totally doesn't need to make any direct communication to Firebase, everything lives in quizbank module. 

Discussion on non-functionality features that our project has 
1. Responsiveness: The response time of our project is pretty good. Everything is rendered and response in timely manner
2. Reliability: Through multiple improvements, the reliability of our project is getting better. It's not at its best yet, but we are improving it as needed every single sprint 
3. Availability: All of the routes that we have provide an adequate UI or responses. Not all UI screens are built, but our routers serve provided templates when requested. 
4. Security: We kind of have a user management system built but it's not far along yet. It still needs a lot of work to make sure we provide an adequate view based on the user's role (Admin or Regular User)
5. Maintainability: Going through 3 sprints, we didn't need to go through complete update to add in a new feature. Any new feature is easily added. 

## Communication Architecture
When a request is made to our router, the router will then call an appropriate methods to our quizbank module. Our quizbank will then make a connection to Firebase database to retrieve the right data to provide our web server. 

This documentation describes the whole communcation flow going from the routers to our UI pages (clients) with diagram [Front-End Structure](/doc/frontendstructuredesign.md)
