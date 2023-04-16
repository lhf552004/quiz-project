## Quiz system structure Design

1. Firebase: Firebase is a backend platform for building web and mobile applications. It provides a suite of tools for authentication, real-time database, storage, and hosting. In this project, we are using Firebase as the database to store quiz questions and answers. In the next iteration will be using it for authentication purpose.

2. Express.js: Express.js is a web application framework for Node.js that provides a set of tools and features for building web applications and APIs. It simplifies the process of handling HTTP requests and responses, routing, and middleware. This is the main service that provides all needed routers for our projects, from rendering a views to a data request call. 
Our router docs are living under `/doc/routers`

3. Pug: Pug is a template engine for Node.js that allows you to write HTML markup in a simpler and more elegant way. It provides a set of features to make it easier to create reusable HTML components, such as partials, mixins, and inheritance. We are using this to build all of our UI templates. 

4. CSS/JS/JQuery/Bootstrap 5: We are using these library and frameworks to help with styling and creating UI templates. 

5. Mocha/Chai/Puppeteer: Mocha is a JS based test framework for Node.js and browser. Chai is an assertion library to supplement Mocha for advanced test and service requests inside our test. Puppeteer framework is used in some Front-End test to perform the exact flow that our app should complete. 

6. QuizBank module: QuizBank is a module that provides a set of classes and methods for managing quiz questions and answers. It includes classes for Quiz and QuizItem, which represent the quiz and quiz questions, respectively. The module provides methods for fetching quiz data from the Firebase database and adding, removing, and updating quiz questions.

7. [QuizBank explanation](/doc/Quizbank%20%26%20DB%20explanation.pdf)

!["Architecture Diagram"](/doc/images/architecture_diagram.png)

