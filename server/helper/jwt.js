const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = {
    encode(id, email) {
        return jwt.sign({
                id: id,
                email: email
            },
            secret);
    },

    decode(token) {
        return jwt.verify(token, secret)
    }
}