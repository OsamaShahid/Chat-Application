var express = require('express');
var router = express.Router();
var userCtrl = require("../Users/UserCtrl");


//here we will save the username of the New user
router.post("/setUserName", userCtrl.setUserName);

module.exports = router;