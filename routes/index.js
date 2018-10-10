var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Chat' });
});




//here we will save the username of the New user
router.post("/setUserName", async (req,res) => {
  try{
    var newUser = new db.Users(req.body);
    await newUser.save()
    res.sendStatus(200);
    obj.io.emit("newUserEntered", {
      Name: req.body.userName,
      NewEntry: true,
    })
  }
  catch(error) {
    res.sendStatus(500);
    console.log(error);
  }
})

module.exports = router;