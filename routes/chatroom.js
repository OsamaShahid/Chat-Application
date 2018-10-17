var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');
var multer  = require('multer');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./public/uploads/')
  },
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now().toString() + file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage
});



/* GET users listing. */
router.get('/:uName', function(req, res, next) {
  db.Users.find({userName:req.params.uName}, function (err, docs) {
    if (!docs.length){
      console.log('No such User exists: ',req.params.uName);
      next(new Error("No such User exists!"));
    }else{                
      res.render('chatroom', {title: 'Welcome to Chat Room', userName: req.params.uName});
      console.log(req.params.uName)
      obj.io.emit("NewUserEntered", req.params.uName);
    }
  });
  
});

router.post('/img/upload', upload.single("msgfile") , async (req, res) => {
  try {
    const newChatMsg = new db.Chats({
      name: req.body.userName,
      chat: req.body.Msg,
      chatImage: req.file.path
    });
    await newChatMsg.save();
    //Emit the event
    obj.io.emit("imgChat", newChatMsg)
  } catch (error) {
      res.sendStatus(500)
      console.error(error)
  }
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
router.get("/send/AllChats", async function(req,res,next) {
  var allChats;
  var allUsers;
  await db.Chats.find({}, (error, chats) => {
      if(!error)
      {
        allChats = chats;
      }
      else {
        next(new Error("No such User exists!"));
        return;
      }
  });

  await db.Users.find({}, (error, users) => {
    if(!error)
    {
      allUsers = users;
    }
    else {
      next(new Error("No such User exists!"));
      return;
    }
  });
  res.send({
    usersToSend: allUsers,
    chatsToSend: allChats
  });
})



// clear method for clearing the chats
router.post("/clear", function(req,res,next){
  // Remove all chats from collection
  db.Chats.remove({}, function(){
      obj.io.emit('cleared');
  });
})

module.exports = router;
