const routes = require('express').Router()
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes')

routes.use('/', userRoutes);
routes.use('/playlist', playlistRoutes);


module.exports = routes