# User
The module is exports one classes User

The instance of User represent a user with email and password

The diagram of [user](../images/user.svg)

## Example 

   create a new user:

    let newUser = new User('', your-email, your-password);
   
   Store the user:

    newUser.store('user');

   Update the user:

    User.update('user', the-user-id, theUser);
   
   Get the user:

    User.fetch('user', your-email, your-password);

   Delete the user:

    User.delete('user', your-id);
   
   Get all users:
    
    User.fetchUsers('user');

## Property

id: string

email: string

password: string

username: string

firstname: string

lastname: string

age: number

## Method

### store(bankSpec)
    
    Store the user into database
    param {*} bankSpec file name for json file to save

### static update(bankSpec, id, updated) 
    
    Update user with id
    
    param {*} bankSpec file name for json file to save
    
    param {*} id Id of the user
    
    param {*} updated the user body

### static fetch(bankSpec, email, password)

    Static method to fetch user by user email
    param {string} bankSpec file name for json file to save
    param {string} email The email of user
    returns User instance

### static fetchUsers(bankSpec)

    Get user list
    param bankSpec 
    returns user list only contain id and email

### static delete(bankSpec, id) 

    Static method to delete user by id in the database

    param bankSpec file name for json file to save
    param id 

