const { Todo, User } = require('../models');
const { checkPassword } = require('../helper/bcrypt');
const { encode } = require('../helper/jwt')

class UserController {

    static register(req, res, next) {
        const form = {
            email: req.body.email,
            password: req.body.password
        };
        User.create(form)
            .then((dataUser) => {
                return res.status(201).json(dataUser);
            }).catch((err) => {
                next(err)
            });
    }

    static async login(req, res, next) {
        const email = req.body.email
        try {
            const dataUser = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!dataUser) {
                console.log(dataUser);
                next({ errCode: "INVALID_EMAIL", message: "invalid username and password" })

            } else {
                const password = req.body.password;
                if (checkPassword(password, dataUser.password)) {
                    const token = encode(dataUser.id, dataUser.email);
                    return res.status(200).json({
                        access_token: token,
                    })
                } else {
                    next({ errCode: "INVALID_EMAIL", message: "invalid username and password" })

                }
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

}

module.exports = UserController;