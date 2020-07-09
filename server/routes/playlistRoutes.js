const routes = require('express').Router()
const Controller = require('../controller/PlaylistController');
const { authentication, authorization } = require('../middleware/auth');

// routes.use(authentication)
// routes.get('/', Controller.findAll);

// routes.get('/:id', Controller.findOneMusic);
// routes.post('/', Controller.addPlaylist);

// routes.delete('/:id', authorization, Controller.deletePlaylist);


module.exports = routes;