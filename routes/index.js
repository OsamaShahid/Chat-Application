var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Chat' });
});




//here we will save the username of the New user
router.post("/setUserName", (req,res, next) => {
  try{
    var newUser = new db.Users(req.body);
    newUser.save()
    res.send(newUser);
  }
  catch(error) {
    res.sendStatus(500);
    console.log(error);
  }
})

module.exports = router;