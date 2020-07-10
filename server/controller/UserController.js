const { User } = require('../models');
const { checkPassword } = require('../helper/bcrypt');
const { encode } = require('../helper/jwt')
const verificationToken = require('../helper/googleOauth')
const axios = require('axios')

const mailboxValidator = axios.create({
    baseURL: 'https://api.mailboxvalidator.com/v1/validation/single?key=ZLDJ9PTKF83YSRQUUJW9&',
});

class UserController {

    static register(req, res, next) {

        let email = req.body.email
        // console.log(req.body);
        
        const form = {
            name: req.body.name,
            email: email,
            password: req.body.password
        };
        User.findOne({ where: { email } })
            .then((emailCheck) => {
                if (emailCheck) {
                    return res.status(400).json('Email already Registered');
                }else{
                    if (!emailCheck) {
                        return mailboxValidator.get(`&email=${email}`)
                    }
                }
            })
            .then((result) => {
                if (result.data.is_verified == "True") {
                    // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                    return User.create(
                        form
                        )
                    }
                    else{
                        return res.status(400).json('Email is invalid');
                    }
                })
            .then((data) => {
                // console.log(data,'datacdsaaaaaa');
                return res.status(201).json(data);
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

    static googleSignIn(req, res, next) {
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
                if (user) {
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
                }, process.env.SECRET)
                res.status(code).json({ token: token })
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController;