var mongoose = require("mongoose");
var cardentials = require("./cardentials");
var Schema = mongoose.Schema;

var conString = "mongodb://localhost:27017/test";

mongoose.Promise = Promise
var Schema = mongoose.Schema;
var ChatsSchema = new Schema({
  name: {type: String, ref:'Users'},
  chat: String,
  chatImage: {type: String}
});

// schema for each started conversation
var StartedConversationsSchema = new Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  leftUser: {type: String, ref:'Users'},
  rightUser: {type: String, ref:'Users'},
  lastMessage: {type: String},
  date: {type: Date},
  unreadMsgCountLeftUser: {type: Number},
  unreadMsgCountRightUser: {type: Number}
});

// schema for conversation messages
var individualChatsSchema = new Schema({
  conversationId: {type: mongoose.Schema.Types.ObjectId, ref: 'StartedConversations'},
  senderName: {type: String},
  receiverName: {type: String},
  TimeOfsending: {type: Date},
  chatImage: {type: String},
  chatMessage: {type: String}
});

var individualChats = mongoose.model('individualChats', individualChatsSchema);

var StartedConversations = mongoose.model('StartedConversations', StartedConversationsSchema);

// Model for chats
var Chats = mongoose.model("Chats", ChatsSchema)

var Users = mongoose.model("Users", {
  userName: {type: String, required: true, unique: true, dropDups: true}
})
mongoose.connect(conString, { useNewUrlParser: true },(err) => {
  console.log("Database connection", err)
})

module.exports.Chats = Chats;
module.exports.Users = Users;
module.exports.StartedConversations = StartedConversations;
module.exports.individualChats = individualChats;
module.exports.mongoose = mongoose;