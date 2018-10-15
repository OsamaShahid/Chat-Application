var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Chat' });
});




//here we will save the username of the New user
router.post("/setUserName", async (req,res, next) => {
  try{
    var newUser = new db.Users(req.body);
    await newUser.save()
    res.send({user: newUser,
    check: true
    });
  }
  catch(error) {
    console.log(error);
    res.send({check: false});
  }
})

module.exports = router;