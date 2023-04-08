## Module: quizRouter

Routes:

### GET '/':

Description: This route is used to retrieve a list of quizes.

Request type: GET

Request parameters: None

Request body: None

Response type: Object

Response body: Rendered *quizlist* page with *list* as a parameter.

### GET '/:name':

Description: This route is used to render the single quiz page.

Request type: GET

Request parameters:

        name(string): The name of the quiz to be retrieved.

Request body: None

Response type: Object

Response body: 

Rendered quiz page with the parameter *data* assigned with the instance of class [**Quiz**](../database/quiz.md) retrived from database with the id.

### GET '/:name/quiz-admin':

Description: This route is used to render the quiz admin page.

Request type: GET

Request parameters:

        name(string): The name of the quiz to be retrieved.

Request body: None

Response type: Object

Response body: 

Rendered quiz admin page with the parameter *data* assigned with the instance of class [**Quiz**](../database/quiz.md) retrived from database with the id.

### POST '/':

Description: This route is used to process a creating of quiz submission.

Request type: POST

Request parameters: None

Request body: 

       name(string): The name of the quiz to be retrieved.

Response type: Object

Response body:

        "quiz create successfully." is sent with status code 200.

### DELETE '/:name':

Description: This route is used to delete a quiz by name.

Request type: DELETE

Request parameters:

        name (string): The name of the quiz to be deleted.

Request body: None

Response type: Object

Response body:

        If the quiz is successfully deleted, "quiz deleted successfully." is sent with status code 200.


### Note: The module uses the Quiz class from the quizBank.mjs module to handle quiz data.