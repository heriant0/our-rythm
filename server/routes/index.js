const routes = require('express').Router()
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes')

routes.use('/playlist', playlistRoutes);
routes.use('/users', userRoutes);


module.exports = routes