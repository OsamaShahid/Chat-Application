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

router.post('/get/particepents',async (req,res,next)=> {
  await db.Users.find({}, (error, result) => {
    try{
      if(!error)
      {
        res.send({
          AllUsers: result,
          check: false
        });
        return;
      }
      else {
        res.send({check: true});
        return;
      }
    }
    catch (error)
    {
      console.log(error);
      res.send({check: true});
      return;
    }
  });
})


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

router.post('/login', async (req,res, next) => {

  try{
    await db.Users.find({userName: req.body.username}, (error, loggedUser) => {
      if(error) {
        res.send(error);
        return;
      }
      if(loggedUser.length)
      {
        res.send(loggedUser);
        console.log(loggedUser);
        obj.io.emit("NewUserJoined", loggedUser);
        return
      }
      else {
        res.send({check: true});
        return
      }
    });
  }
  catch(error) {
    console.log(error);
    res.send(error);
    return;
  }

})

router.post('/validateSession', async (req,res, next)=> {
  try{
    console.log(req.body);
    await db.Users.find({userName: req.body.Username}, (error, loggedUser) => {
      if(error) {
        res.send({
          check: true,
          Error: error
        });
        return;
      }
      if(loggedUser.length)
      {
        res.send(loggedUser);
        console.log(loggedUser);
        obj.io.emit("NewUserJoined", loggedUser);
        return
      }
      else {
        res.send({check: true});
        return
      }
    });
  }
  catch(error) {
    console.log(error);
    res.send(error);
    return;
  }
});

router.post('/img/upload', upload.single("msgfile") , async (req, res) => {
  try {
    const newChatMsg = new db.Chats({
      name: req.body.userName,
      chat: req.body.chatMsg,
      chatImage: "http://192.168.34.54:4747/uploads/" + req.file.filename
    });
    await newChatMsg.save();
    //Emit the event
    obj.io.emit("onBroadCastMsg", newChatMsg)
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
      obj.io.emit("onBroadCastMsg", chat)
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
          conversationId: conversation[0]._id,
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
    else {
      await db.StartedConversations.find({leftUser:req.body.ReceiverName, rightUser:req.body.SenderName},async function(err, resultChat) {
        if(err) {
          res.send(err);
          return;
        }
        if(resultChat.length) {
          try {
            var newindividualChatMsg = new db.individualChats({
              conversationId: resultChat[0]._id,
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
        else {
          try {
            var newStartedCnversation = new db.StartedConversations({
              id: new db.mongoose.Types.ObjectId(),
              leftUser: req.body.ReceiverName,
              rightUser: req.body.SenderName
            });
            await newStartedCnversation.save();
            var newindividualChatMsg = new db.individualChats({
              conversationId: newStartedCnversation._id,
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
        }
      });
    }
  });
});

router.post("/getallindchat", async function(req, res, next) {
  var check = false;
  console.log(req.body);
  if(!check)
  {
    await db.StartedConversations.find({leftUser:req.body.ReceiverName, rightUser:req.body.SenderName}, async function(err, conversation) {
      if(err) {
        res.send(err);
        return;
      }
      if(conversation.length) {
        check = true;
        await db.individualChats.find({conversationId: conversation[0]._id}, function(err, converstionList){
          if(err) {
            res.send(err);
            return;
          }
          if(converstionList.length)
          {
            console.log(converstionList);
            res.send({
              check: true,
              chatList: converstionList
            });
            return;
          }
        })
      }
      else {
        res.send({check: false});
      }
    });
  }
});

router.post("/getallindchatR", async function(req, res, next) {
  var check = false;
  console.log(req.body);
  if(!check)
  {
    await db.StartedConversations.find({leftUser:req.body.senderName, rightUser:req.body.receiverName}, async function(err, conversation) {
      if(err) {
        res.send(err);
        return;
      }
      if(conversation.length) {
        check = true;
        await db.individualChats.find({conversationId: conversation[0]._id}, function(err, converstionList){
          if(err) {
            res.send(err);
            return;
          }
          if(converstionList.length)
          {
            console.log(converstionList);
            res.send({
              check: true,
              chatList: converstionList
            });
            return;
          }
        })
      }
      else {
        res.send({check: false});
      }
    });
  }
});

// Get chat messages from detabase and return to client
router.post("/get/chats", async function(req,res,next) {
  var allChats;
  await db.Chats.find({}, async (error, chats) => {
      if(!error)
      {
        allChats = chats;
      }
      else {
        res.send({check: true});
        return;
      }
  });
  res.send({
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
