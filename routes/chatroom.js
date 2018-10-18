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

router.post('/putIndChats', async (req, res, next) => {
  await db.StartedConversations.find({leftUser:req.body.SenderName, rightUser:req.body.ReceiverName}, async function(err, conversation) {
    if(err) {
      res.send(err);
      return;
    }
    if(conversation.length) {
      try {
        var newindividualChatMsg = new db.individualChats({
          conversationId: conversation.id,
          senderName: req.body.SenderName,
          receiverName: req.body.ReceiverName,
          TimeOfsending: req.body.currentDateTime,
          chatImage: req.body.chatImage,
          chatMessage: req.body.chat
        });
        await newindividualChatMsg.save();
        res.sendStatus(200)
        //Emit the event
        obj.io.emit("indChat", newindividualChatMsg)
        return;
      }
      catch (error) {
        console.log(error);
        res.send(error);
        return
      }
    }
  });

  await db.StartedConversations.find({leftUser:req.body.ReceiverName, rightUser:req.body.SenderName},async function(err, conversation) {
    if(err) {
      res.send(err);
      return;
    }
    if(conversation.length) {
      try {
        var newindividualChatMsg = new db.individualChats({
          conversationId: conversation.id,
          senderName: req.body.SenderName,
          receiverName: req.body.ReceiverName,
          TimeOfsending: req.body.currentDateTime,
          chatImage: req.body.chatImage,
          chatMessage: req.body.chat
        });
        await newindividualChatMsg.save();
        res.sendStatus(200)
        //Emit the event
        obj.io.emit("indChat", newindividualChatMsg)
        return;
      }
      catch (error) {
        console.log(error);
        res.send(error);
        return
      }
    }
  });

  try {
    var newStartedCnversation = new db.StartedConversations({
      id: new db.mongoose.Types.ObjectId(),
      leftUser: req.body.ReceiverName,
      rightUser: req.body.SenderName
    });
    await newStartedCnversation.save();
    var newindividualChatMsg = new db.individualChats({
      conversationId: newStartedCnversation.id,
      senderName: req.body.SenderName,
      receiverName: req.body.ReceiverName,
      TimeOfsending: req.body.currentDateTime,
      chatImage: req.body.chatImage,
      chatMessage: req.body.chat
    });
    await newindividualChatMsg.save();
    res.sendStatus(200)
    //Emit the event
    obj.io.emit("indChat", newindividualChatMsg)
    return;

  }
  catch(error) {
    console.log(error);
    res.send(error);
    return;
  }
  
});

router.get("/getallchats/ind/:SenderName/:ReceiverName", async function(req, res, next) {
  var check = false;
  await db.StartedConversations.find({leftUser:req.params.SenderName, rightUser:req.params.ReceiverName},function(err, conversation) {
    if(err) {
      res.send(err);
      return;
    }
    if(conversation.length) {
      check = true;
    }
  });
  if(!check)
  {
    await db.StartedConversations.find({leftUser:req.params.ReceiverName, rightUser:req.params.SenderName},function(err, conversation) {
      if(err) {
        res.send(err);
        return;
      }
      if(conversation.length) {
        check = true;
      }
    });
  }
  if(!check)
  {
    res.send({check: false});
    return;
  }
  else {
  }
});

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
