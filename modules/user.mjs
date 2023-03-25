import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

/**
 * @module User The module is exports one classes User
 * The instance of User represent a user with email and password
 * 
 */
class User {

    /**
     * User Constructor
     * @param {*} id The id of the user, which would be generated automatically.
     * @param {*} email The email address of the user
     * @param {*} password The plain text of the user
     */
    constructor(id, email, password, username) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.firstname = '';
        this.lastname = '';
        this.age = 0;
    }

    /**
     * Store the user into database
     * @param {*} bankSpec file name for json file to save
     */
    store(bankSpec) {
        const fileName = `${bankSpec}.json`;
        let users = [];
        if (fs.existsSync(fileName)) {
            let rawdata = fs.readFileSync(fileName);
            users = JSON.parse(rawdata);
        }
        // Check whether it exists in the database with email
        const index = users.findIndex(q => q.email === this.email);
        if (index > -1) {
            throw new Error('User already existed.');
        } else {
            // create
            this.id = uuidv4();
            users.push(this);
        }
        const data = JSON.stringify(users);
        fs.writeFileSync(fileName, data);
    }

    /**
     * Update user with id
     * @param {*} bankSpec file name for json file to save
     * @param {*} id Id of the user
     * @param {*} updated the user body
     */
    static update(bankSpec, id, updated) {
        const fileName = `${bankSpec}.json`;
        let users = [];
        if (fs.existsSync(fileName)) {
            let rawdata = fs.readFileSync(fileName);
            users = JSON.parse(rawdata);

            // Check whether it exists in the database with email
            const index = users.findIndex(q => q.id === id);
            if (index > -1) {
                // update
                const user = users.find(q => q.id === id);
                const updatedUser = Object.assign(user, updated);
                users.splice(index, 1, updatedUser);
            } else {
                throw new Error("The user doesn't exist.");
            }
        }
        const data = JSON.stringify(users);
        fs.writeFileSync(fileName, data);
    }

    /**
     * Static method to fetch user by user email
     * @param {string} bankSpec file name for json file to save
     * @param {string} email The email of user
     * @returns User instance
     */
    static fetch(bankSpec, email, password) {
        const fileName = `${bankSpec}.json`;
        try {
            if (fs.existsSync(fileName)) {
                let rawdata = fs.readFileSync(fileName);
                let users = JSON.parse(rawdata);
                const user = users.find(q => q.email === email && q.password == password);
                if(user !== undefined)
                    return Object.assign(new User(), user);
                else
                    return undefined;
            }
        } catch (err) {

        }
        return undefined;
    }


    /**
     * Get user list
     * @param {*} bankSpec 
     * @returns user list only contain id and email
     */
    static fetchUsers(bankSpec) {
        const fileName = `${bankSpec}.json`;
        try {
            if (fs.existsSync(fileName)) {
                let rawdata = fs.readFileSync(fileName);
                let users = JSON.parse(rawdata);
                users.map(u => ({ id: u.id, email: u.email }));
                return users;
            }
        } catch (err) {

        }
        return undefined;
    }

    /**
     * Static method to delete user by id in the database
     * @param {*} bankSpec file name for json file to save
     * @param {string} id 
     */
    static delete(bankSpec, id) {
        const fileName = `${bankSpec}.json`;
        try {
            if (fs.existsSync(fileName)) {
                const rawdata = fs.readFileSync(fileName);
                const users = JSON.parse(rawdata);
                const index = users.findIndex(q => q.id === id);
                if (index > -1) {
                    users.splice(index, 1);
                }
                const data = JSON.stringify(users);
                fs.writeFileSync(fileName, data);
            }
        } catch (err) {
            return -1;
        }
        return 0;
    }
}

export { User };