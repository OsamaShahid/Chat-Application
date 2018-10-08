var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var obj = require('../bin/www');


var conString = "mongodb://127.0.0.1:27017/meanchatappdb";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Chat' });
});

mongoose.Promise = Promise
var Schema = mongoose.Schema;
var ChatsSchema = new Schema({
  name: {type: String, ref:'Users'},
  chat: String
});
// Model for chats
var Chats = mongoose.model("ChatsData", ChatsSchema)

var Users = mongoose.model("Users", {
  _id: Schema.Types.ObjectId,
  userName: {type: String, required: true, unique: true, dropDups: true}
})
mongoose.connect(conString, { useNewUrlParser: true },(err) => {
  console.log("Database connection", err)
})

// save a new chat message in database
router.post("/chats", async (req, res) => {
  try {
      var chat = new Chats(req.body)
      await chat.save()
      res.sendStatus(200)
      //Emit the event
      obj.io.emit("chat", req.body)
  } catch (error) {
      res.sendStatus(500)
      console.error(error)
  }
})

// Get chat messages from detabase and return to client
router.get("/chats", (req, res) => {
  Chats.find({}, (error, chats) => {
      res.send(chats)
  })
})

// clear method for clearing the chats
router.post("/clear", function(){
  // Remove all chats from collection
  Chats.remove({}, function(){
      obj.io.emit('cleared');
  });
})

module.exports = router;