var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Chat' });
});




//here we will save the username of the New user
router.get("/setUserName/:userName", function(req,res,next) {
  try{
    var userObj = {
      userName: req.params.userName
    }
    var newUser = new db.Users(userObj);
    newUser.save()
    //Emit the event that a new user has joined the chat
    obj.io.emit("newUserJoined",req.params.userName)
    return res.redirect(301, '/chatroom');
  }
  catch(error) {
    res.sendStatus(500);
    console.log(error);
  }
})

module.exports = router;