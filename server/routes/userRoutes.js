const routes = require('express').Router()
const Controller = require('../controller/UserController')


routes.post('/login', Controller.login);
routes.post('/register', Controller.register);
// routes.post("/googleSignIn", Controller.googleSignIn)

module.exports = routes;