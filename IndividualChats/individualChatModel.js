var mongoose = require("mongoose");
var individualChatsSchema = require("./individualChatSchema").individualchatschema;

var individualChats = mongoose.model('individualChats', individualChatsSchema);

module.exports.individualChats = individualChats;