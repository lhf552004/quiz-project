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
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    /**
     * Store the user into database
     * @param {*} bankSpec 
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
            // update
            users.splice(index, 1, this);
        } else {
            // create
            this.id = uuidv4();
            users.push(this);
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
                return Object.assign(new User(), user);
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