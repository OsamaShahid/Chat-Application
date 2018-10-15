var mongoose = require("mongoose");
var cardentials = require("./cardentials");
var Schema = mongoose.Schema;

var conString = "mongodb+srv://Usama_ChatRoomAdmin:" + cardentials.pin +"@chatroom-thbkc.mongodb.net/test?retryWrites=true";

mongoose.Promise = Promise
var Schema = mongoose.Schema;
var ChatsSchema = new Schema({
  name: {type: String, ref:'Users'},
  chat: String,
  chatImage: {type: String}
});
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