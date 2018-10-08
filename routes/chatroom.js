var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('chatroom', {title: 'Welcome to Chat Room'});
});

module.exports = router;
