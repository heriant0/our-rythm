const routes = require('express').Router()
const userRoutes = require('./userRoutes')
const  deezerRoutes = require('./api-deezer')
const mailgun = require('./mailgun')

routes.use('/', userRoutes);
routes.use('/api', deezerRoutes);
routes.use('/sendmail',mailgun)


module.exports = routes