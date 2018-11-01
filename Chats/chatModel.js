var mongoose = require("mongoose");
var chatschema = require("./chatSchema").chatschema;

var Chats = mongoose.model("Chats", chatschema);

module.exports.Chats = Chats;