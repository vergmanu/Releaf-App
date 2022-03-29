var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')

/* GET users listing. */
router.get('/', postsCtrl.index)
router.get('/new', postsCtrl.new); 
router.post('/', postsCtrl.create)

module.exports = router;
