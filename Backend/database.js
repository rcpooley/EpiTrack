const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./secret.json');

class Database {
    async login(username, password) {
        const token = jwt.sign(
            {
                username
            },
            jwtSecret
        );
        return token;
    }
}

module.exports = Database;
