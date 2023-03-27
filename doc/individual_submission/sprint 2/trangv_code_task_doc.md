## Documentation for Individual Submission Sprint 2

I have done these 3 tasks for this sprint 

For my new code task, I want to implement the back button for single quiz page. However, the backend is not ready for the parameter that I need for that functionality. Therefore, I moved to do some standardizing and reconstruction for our project css. 

### 1. Standardize and clean up CSS for the project 
After the first sprint, I observed that all 3 front-end devs have very different styles of writting CSS, and also many duplications in style happened in the codebase. 
Therefore, I decided that we need to clean it up, and make sure we can reuse as much as we can instead of having a same block of code multiple times. 
I updated everyone else css classes, and also their view to make sure everything still works as expected. 
Styles are now broken up into file specific instead one long `style.css` file. 

I also made a detailed documentation for everyone to understand then new structure.

[PR](https://github.com/MUN-COMP6905/project-eteam/pull/120)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/113)

[Doc File](/doc/csscodestyle.md)

### 2. Make sure the single quiz page to use the correct API calls from quizBank module 
From sprint 1, there was no routes to get single quiz item details. Therefore, I had to print the answers on the DOM to check if the answer is correct or not. Because of the delay in response from the backend team, I have made the changes to make sure I have enough time to finish developement and create test. 

There was a big change in quizBank module, the PR was merged in late and my calls were broken after that. I had to fix my page quickly to make sure the page displays and works correctly. The PR for this fix is later than team schedule as an exception to match with new structure. 

I made a quick adjustment to the router at first to be a hot fix for the project instead of rushing backend dev to fix everything to match the new quizbank. Later on, the member who is in charge of the router made the official updates for the routes, and I also made sure my page and test would work correctly with the new routes. 

[PR](https://github.com/MUN-COMP6905/project-eteam/pull/151)

[PR collaborate with other member PR](https://github.com/MUN-COMP6905/project-eteam/pull/155)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/98)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/146)

[quiz.js](/public/js/quiz.js)

[quiz.pug](/views/quiz.pug)

!["Quiz Page Updated UML"](/doc/images/QuizPageUpdatedUML.png)

### 4. Regression Test for Single Quiz Page
I created a UI regression test for the page to make sure all of the options would display. It was pretty tricky to create an automated UI test with mocha. After some research, I figured to use pupeteer as a shadow browser to run all of the UI actions. 

These are the things that I check in my test. 
- Correct page display with the title 
- The page has next button 
- All of the options for the quiz item should show 
- Right answer displays correctly when selected
- Wrong answer display correctly when selected
- Result also display correctly with the right result 

Steps to run my test: 
1. run `npm install`
2. run `node serve.js`
3. open NEW terminal, **DO NOT CLOSE** the one from step 3, we need to have it running for the test
4. in the new terminal, go to the project folder, then run `npx mocha test/quizPage.js`

[PR](https://github.com/MUN-COMP6905/project-eteam/pull/127)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/122)

[quizPage.js](/test/quizPage.js)


