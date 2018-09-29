var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController');

/* GET home page. */
router.get('/', homeController.getListAnime);
router.get('/detail/:name_slug/:chap', homeController.getAnime);

module.exports = router;
