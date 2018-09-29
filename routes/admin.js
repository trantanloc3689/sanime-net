var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController');

/* GET users listing. */
router.get('/',adminController.getListAnime);
router.get('/addAnime', adminController.getAdd);
router.post('/addAnime', adminController.postAdd);

router.get('/addEpisode/:name_slug', adminController.getAddEpisode);
router.post('/addEpisode/:name_slug', adminController.postAddEpisode);
  
module.exports = router;