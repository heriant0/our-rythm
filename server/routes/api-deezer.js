const router = require('express').Router()
const apiDeezer = require('../controller/apiDeezerController')

router.get('/:songTitle',apiDeezer.find)

module.exports = router