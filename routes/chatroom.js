var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');

/* GET users listing. */
router.get('/:uName', function(req, res, next) {
  res.render('chatroom', {title: 'Welcome to Chat Room', userName: req.params.uName});
});

// save a new chat message in database
router.post("/putChats", async (req, res, next) => {
  try {
      var chat = new db.Chats(req.body)
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
router.get("/send/AllChats", function(req,res,next) {
  db.Chats.find({}, (error, chats) => {
      res.send(chats)
  })
  
})

// clear method for clearing the chats
router.post("/clear", function(req,res,next){
  // Remove all chats from collection
  db.Chats.remove({}, function(){
      obj.io.emit('cleared');
  });
})

module.exports = router;
