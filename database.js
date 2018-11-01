var mongoose = require("mongoose");

var conString = "mongodb://localhost:27017/test";
mongoose.Promise = Promise

mongoose.connect(conString, { useNewUrlParser: true },(err) => {
  console.log("Database connection", err)
})

module.exports.Chats = require("./Chats/chatModel").Chats;
module.exports.Users = require("./Users/UserModel").Users;
module.exports.StartedConversations = require("./StartedConversations/startedConversationModel").StartedConversations;
module.exports.individualChats = require("./IndividualChats/individualChatModel").individualChats;
module.exports.mongoose = mongoose;