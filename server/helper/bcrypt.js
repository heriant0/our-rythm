const bcrypt = require('bcrypt');
const saltRound = 8;

module.exports = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(password, salt);

        return hash;
    },
    checkPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    },

}