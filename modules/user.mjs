import fs from 'fs';

class User {
    
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

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
            users.splice(index, 1, this);
        } else {
            users.push(this);
        }
        const data = JSON.stringify(users);
        fs.writeFileSync(fileName, data);
    }

    /**
     * Static method to fetch quiz item by user email
     * @param {string} bankSpec file name for json file to save
     * @param {string} email The email of user
     * @returns QuizItem instance
     */
    static fetch(bankSpec, email, password) {
        const fileName = `${bankSpec}.json`;
        try {
            if (fs.existsSync(fileName)) {
                let rawdata = fs.readFileSync(fileName);
                let users = JSON.parse(rawdata);
                const user = users.find(q => q.id === email && q.password == password);
                return Object.assign(new User(), user);
            }
        } catch (err) {
            // TODO
        }
        return undefined;
    }
}

export { User };