## Documentation for Individual Submission Sprint 3

### 1. Create Add New Quiz Modal
Instead of asking for a new route to add in a page for this functionality, I found that this function is too simple that a modal would do its job. Therefore, I moved forward with creating a modal and connect with quizbank API to create a new quiz in a much simpler way. The modal is added to the admin dashboard page and can be trigger with a button link

[PR](https://github.com/MUN-COMP6905/project-eteam/pull/180)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/168)

### 2. Create A Page to Add in New Quiz Item
Create the design and UI for add in a new quiz item to a specific quiz. The page is fully connected to the project API and successfully added new quiz item.

[PR](https://github.com/MUN-COMP6905/project-eteam/pull/180)

[Task Card]((https://github.com/MUN-COMP6905/project-eteam/issues/169))

### 4. Regression Test for Add New Quiz Modal
I created a test to make sure that the modal exist, open when the trigger is clicked, also successfully created new quiz. I also made sure to delete the test quiz when the test is completed. 

Things that I check in my test 
1. Should show admin page
2. Check add new quiz button
3. Check successfully create quiz
    - Type in quiz name 
    - Click add button
    - Redirect to add new quiz item page 

Steps to run my test: 
1. run `npm install` to install all necessary test suites
2. run `npx mocha test/createQuizModal.js --exit`

[PR](https://github.com/MUN-COMP6905/project-eteam/pull/193)

[Task Card](https://github.com/MUN-COMP6905/project-eteam/issues/184)

[createQuizModal.js](/test/createQuizModal.js)


