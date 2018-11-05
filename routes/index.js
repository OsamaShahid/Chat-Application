const express = require('express');
var router = express.Router();
const UserCtrl = require("../Users/UserCtrl");

const userCtrl = new UserCtrl();

//here we will save the username of the New user
router.post("/setUserName", userCtrl.setUserName);

module.exports = router;