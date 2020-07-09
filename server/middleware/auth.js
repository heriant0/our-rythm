const { encode, decode } = require('../helper/jwt');
const { Playlist, User } = require('../models')

module.exports = {
    //1. check apakah user punya akses token atau tidak
    authentication(req, res, next) {
        const access_token = req.headers.access_token
        if (!access_token) {
            next({ errCode: "TOKEN_NOT_FOUND", message: "Token is required" })
        } else {
            const userData = decode(access_token);
            req.userData = userData;
            User.findOne({
                    where: {
                        email: userData.email
                    }
                })
                .then((user) => {
                    if (user) {
                        next();
                    } else {
                        next({ errCode: "USER_NOT_FOUND", message: "user is required" })
                    }
                }).catch((err) => {
                    next(err)
                });
        }
    },

    authorization(req, res, next) {
        const idTodos = req.params.id
        Todo.findOne({ where: { id: idTodos } })
            .then((todo) => {
                if (!todo) {
                    next({ errCode: "DATA_NOT_FOUND", message: "Data is not found !" })
                } else if (todo.UserId === req.userData.id) {
                    next();
                } else {
                    next({ errCode: "FORBIDEN_ACCESS", message: "Not authorized or dont have access" });
                }
            }).catch((err) => {
                next(err)
            });
    }

}