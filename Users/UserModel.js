var mongoose = require("mongoose");
var userschema = require("./userSchema").userschema;

var Users = mongoose.model("Users", userschema);

module.exports.Users = Users