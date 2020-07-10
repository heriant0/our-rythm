const routes = require('express').Router()
const mailgun = require('../controller/MailgunController')

routes.post('/', mailgun.send)

module.exports = routes