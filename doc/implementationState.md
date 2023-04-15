## Implementation State

This doc will explain everything that is implemented on the front-end and back-end of the project. 

For easy access, all built front-end pages are listed in the homepage of the project | [Home](http://localhost:3000/)

Users: 
Back-end is ready with CREATE, GET, PUT, and DELETE. Users are stored in a local json file, no connection with any remote database yet. 

Front-end is done connected to GET with Login page, and CREATE with Signup Page

Users is not in scope for further implementation in sprint 1-3. Therefore, user profile is not built, and redirection after login is not implemented. 

Quiz: 
Back-end/Router is done with 
- Get quiz list 
- Get single quiz by name 
- Get single quiz admin by name
- Create a quiz
- Delete a quiz 

Front-end is done with
- Get single quiz page: Fully functional: Right/Wrong answers, shows result [Quiz GK](http://localhost:3000/quiz/GK)
- Add new quiz is done in a modal of admin dashboard: Fully implemented. Access by clicking "Add New Quiz+"
- Single Quiz Admin: Dynamically shows all questions of a specific quiz. Add new question is connected. Edit and Delete is not connected [Quiz GK admin](http://localhost:3000/quiz/GK/quiz-admin)
- Delete is not connected to the backend

Quiz Item: 
Back-end/Router is done with 
- Get single quiz item of specific quiz
- Create quiz item for specific quiz
- Update quiz item of specific quiz
- Delete quiz item of specific quiz
- Render Add Quiz Item and Edit Quiz Item View

Front-end is done with 
- Add new quiz item to quiz: Add new quiz item is fully implemented. Add question, options and select correct answer [Add quiz item to quiz GK](http://localhost:3000/quizitem/quiz/GK/add-quiz-item)
- Using GET request in javascript for single quiz page
- UPDATE and DELETE are not connected to the back-end

Front-end is done with 
- Create Account Page is fully functional. user can create new account and if he already has account the he can navigate to login page [Create New Account](http://localhost:3000/users/create)
- On User Dashboard Page, user can navigate to quiz page to give the specific quiz by click on the particular quiz name link [User Dashboard](http://localhost:3000/users/dash-board/1)
- Analyze, Preview and logout functionality are not implemented in this this sprint. This will be done in next sprint.
- On Manage Your Quiz(For Admin Page) admin user can get the list of all the question for particular quiz [View of Maths Quiz](http://localhost:3000/quiz/Maths/quiz-admin#) , [View of GK Quiz](http://localhost:3000/quiz/GK/quiz-admin#)
- Add New Question, Edit and Delete are not connected to the back-end


