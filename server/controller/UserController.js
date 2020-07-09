const { User } = require('../models');
const { checkPassword } = require('../helper/bcrypt');
const { encode } = require('../helper/jwt')
const verificationToken = require('../helper/googleOauth')

class UserController {

    static register(req, res, next) {
        const form = {
            name: req.body.name,
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
                        user_name: dataUser.name
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

    static googleSignIn(req, res ,next){
        let google_token = req.headers.google_token
        let email = null
        let newUser = false
        console.log('<<<<<<<test login')
        verificationToken(google_token)
        .then(payload => {
            email = payload.email
            return User.findOne({
                where: {
                    email
                }
            })
        })
        .then(user => {
            if(user){
                return user
            } else {
                newUser = true
                return User.create({
                    email,
                    password: process.env.DEFAULT_GOOGLE_PASSWORD
                })
            }
        })
        .then(user => {
            let code = newUser ? 202 : 201
            const token = encode({
                id: user.id,
                email: user.email
            },process.env.SECRET)
            res.status(code).json({token: token})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = UserController;