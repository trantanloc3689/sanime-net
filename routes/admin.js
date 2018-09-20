var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController');

/* GET users listing. */
router.get('/',function(req, res) {
    res.send('admin'); 
  });
router.get('/addfilm', adminController.getAdd);
router.post('/addfilm', adminController.postAdd);

router.get('/:title_slug/addEpisode', adminController.getAddEpisode);
router.post('/:title_slug/addEpisode', adminController.postAddEpisode);
  
module.exports = router;