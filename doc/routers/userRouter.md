## Module: userRouter

Routes:

### GET 'users/':

Description: This route is used to retrieve a list of users.

Request type: GET

Request parameters: None

Request body: None

Response type: Object

Response body: "List of users"

### GET 'users/login':

Description: This route is used to render the login page.

Request type: GET

Request parameters: None

Request body: None

Response type: Object

Response body: Rendered login page.

### POST 'users/login':

Description: This route is used to process a login form submission.

Request type: POST

Request parameters: None

Request body:

        email (string): The user's email address.
        password (string): The user's password.

Response type: Object

Response body:

        If the user is found, Rendered *profile* page with email as a parameter.
        If the user is not found, "User not found or password not correct." is sent.

### GET 'users/create':

Description: This route is used to render the create account page.

Request type: GET

Request parameters: None

Request body: None

Response type: Object

Response body: Rendered *createAccount* page.

### POST 'users/create':

Description: This route is used to process a create account form submission.

Request type: POST

Request parameters: None

Request body:

        email (string): The user's email address.
        password (string): The user's password.
        
Response type: Object

Response body: Rendered *profile* page with *id* as a parameter.

### PUT 'users/:id':

Description: This route is used to update a user by id.

Request type: PUT

Request parameters:
    
        id (string): The id of the user to be updated.

Request body:

        email (string): The user's new email address.
        password (string): The user's new password.

Response type: Object

Response body: Rendered *profile* page with *id* as a parameter.

### DELETE 'users/:id':

Description: This route is used to delete a user by id.

Request type: DELETE

Request parameters:

        id (string): The id of the user to be deleted.

Request body: None

Response type: Object

Response body:

        If the user is successfully deleted, "user deleted successfully." is sent with status code 200.

        If the user deletion fails, "user deleted failed." is sent with status code 500.

### GET 'users/dash-board/:id':

Description: This route is used to render the user dashboard page.

Request type: GET

Request parameters:

        id (string): The id of the user.

Request body: None

Response type: Object

Response body: Rendered dashboard page, parameter *quizzes*, which are the array of quiz names.


### GET 'users/admin/:id':

Description: This route is used to render the user admin page.

Request type: GET

Request parameters:

        id (string): The id of the user.

Request body: None

Response type: Object

Response body: Rendered admin page.

### Note: The module uses the User class from the user.mjs module to handle user data.