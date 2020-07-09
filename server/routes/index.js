const routes = require('express').Router()
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes')
const  deezerRoutes = require('./api-deezer')

routes.use('/', userRoutes);
routes.use('/playlist', playlistRoutes);
routes.use('/api', deezerRoutes);


module.exports = routes