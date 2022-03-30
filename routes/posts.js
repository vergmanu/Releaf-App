var express = require('express');
const { route } = require('.');
var router = express.Router();
const postsCtrl = require('../controllers/posts')
const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', postsCtrl.index);
router.get('/new',  isLoggedIn, postsCtrl.new); 
router.get('/:id', postsCtrl.show);
router.post('/', isLoggedIn, postsCtrl.create);
router.get('/:id/edit', postsCtrl.edit);
router.put('/:id', postsCtrl.update);

module.exports = router;
