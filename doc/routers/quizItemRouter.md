## Module: quizItemRouter

Routes:

### GET '/quizitem/:id/quiz/:name':

Description: This route is used to render the single quiz item.

Request type: GET

Request parameters:

        id(number): The id of the quiz item to be retrieved.
        name(string): The name of the quiz to be retrieved.

Request body: None

Response type: Object

Response body: 

Return json object [**QuizItem**](../database/quiz.md)

### GET '/quizitem/quiz/:name/add-quiz-item':

Description: This route is used to render the add-quiz-item page.

Request type: GET

Request parameters:

        name(string): The name of the quiz to be retrieved.

Request body: None

Response type: Object

Response body: 

Rendered add-quiz-item page with the parameter *name* which is quiz name

### GET '/quizitem/quiz/:name/update-quiz-item/:id':

Description: This route is used to render the update-quiz-item page.

Request type: GET

Request parameters:

        name(string): The name of the quiz.
        id(string): The id of the quiz item to be retrieved.

Request body: None

Response type: Object

Response body: 

Rendered update-quiz-item page with the parameter *quizItem* which is quiz item

### POST '/quizitem/:name':

Description: This route is used to process a creating of quiz item.

Request type: POST

Request parameters:

        name(string): The name of the quiz to be retrieved.

Request body: 

object of class [QuizItem](../database/quiz.md)        

Response type: Object

Response body:

        Rendered quiz page with the parameter *data* assigned with the instance of class [**Quiz**](../database/quiz.md) retrived from database with the id.

### PUT '/quizitem/:name/quizitem/:id':

Description: This route is used to process a updating of quiz item.

Request type: PUT

Request parameters:

        name(string): The name of the quiz to be retrieved.
        id(string): The id of the quiz item to be retrieved.

Request body: 

object of class [QuizItem](../database/quiz.md)        

Response type: Object

Response body:

        If the quizItem is successfully updated, "quizItem updated successfully." is sent with status code 200.

### DELETE '/quizitem/:id/quiz/:name':

Description: This route is used to delete a quiz item by id and quiz nem.

Request type: DELETE

Request parameters:

        id (string): The id of the quiz to be deleted.
        name(string): The name of the quiz to be retrieved.

Request body: None

Response type: Object

Response body:

        If the quizItem is successfully deleted, "quizItem deleted successfully." is sent with status code 200.


### Note: The module uses the Quiz class from the quizBank.mjs module to handle quiz data.