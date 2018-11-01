var express = require('express');
var router = express.Router();
const obj = require('../bin/www');
var db = require('../database');
var multer  = require('multer');
const conversationCtrl = require('../StartedConversations/ConversationCtrl');
const userCtrl = require("../Users/UserCtrl");
const chatCtrl = require('../Chats/chatCtrl');
const individualChatCtrl = require('../IndividualChats/individualChatCtrl');
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

router.post('/get/particepents',userCtrl.getParticepents)

router.post('/myStartedConersations', conversationCtrl.getConversationsResult);

router.post('/login', userCtrl.Login);

router.post('/reduceIndividChatCount', conversationCtrl.reduceUnreadMessageCount);

router.post('/validateSession', userCtrl.validateSession);

router.post("/putChats", chatCtrl.saveChatMessage);

router.post("/get/chats", chatCtrl.getAllChats)

router.post('/img/upload', upload.single("msgfile") , chatCtrl.saveImageChatMessage);

router.post('/indvidimg/upload', upload.single("msgfile"), async function(req, res, next) {
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
          chatImage: "http://192.168.34.54:4747/uploads/" + req.file.filename,
          chatMessage: req.body.chat
        });
        await newindividualChatMsg.save();

        conversation[0].date = req.body.currentDateTime;
        conversation[0].lastMessage = req.body.chat;
        conversation[0].unreadMsgCountRightUser += 1;
        await conversation[0].save();

        
        //Emit the event
        await obj.io.emit("indChat", newindividualChatMsg)
        res.sendStatus(200)
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
              chatImage: "http://192.168.34.54:4747/uploads/" + req.file.filename,
              chatMessage: req.body.chat
            });
            await newindividualChatMsg.save();
            
            resultChat[0].date = req.body.currentDateTime;
            resultChat[0].lastMessage = req.body.chat;
            resultChat[0].unreadMsgCountLeftUser += 1;
            await resultChat[0].save();

            
            //Emit the event
            await obj.io.emit("indChat", newindividualChatMsg)
            res.sendStatus(200)
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
              rightUser: req.body.SenderName,
              date: new Date(),
              lastMessage: "",
              unreadMsgCountLeftUser: 0,
              unreadMsgCountRightUser: 0
            });
            await newStartedCnversation.save();
            var newindividualChatMsg = new db.individualChats({
              conversationId: newStartedCnversation._id,
              senderName: req.body.SenderName,
              receiverName: req.body.ReceiverName,
              TimeOfsending: req.body.currentDateTime,
              chatImage: "http://192.168.34.54:4747/uploads/" + req.file.filename,
              chatMessage: req.body.chat
            });
            await newindividualChatMsg.save();

            newStartedCnversation.date = req.body.currentDateTime;
            newStartedCnversation.lastMessage = req.body.chat;
            newStartedCnversation.unreadMsgCountLeftUser += 1;
            await newStartedCnversation.save();

            //Emit the event
            await obj.io.emit("indChat", newindividualChatMsg)
            res.sendStatus(200)
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


router.post('/putIndChats', async function(req, res, next) {
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

        conversation[0].date = req.body.currentDateTime;
        conversation[0].lastMessage = req.body.chat;
        conversation[0].unreadMsgCountRightUser += 1;
        await conversation[0].save();
        //Emit the event
        obj.io.emit("indChat", newindividualChatMsg)
        res.sendStatus(200)
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

            resultChat[0].date = req.body.currentDateTime;
            resultChat[0].lastMessage = req.body.chat;
            resultChat[0].unreadMsgCountLeftUser += 1;
            await resultChat[0].save();
            //Emit the event
            obj.io.emit("indChat", newindividualChatMsg)
            res.sendStatus(200)
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
              rightUser: req.body.SenderName,
              date: new Date(),
              lastMessage: "",
              unreadMsgCountLeftUser: 0,
              unreadMsgCountRightUser: 0
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

            newStartedCnversation.date = req.body.currentDateTime;
            newStartedCnversation.lastMessage = req.body.chat;
            newStartedCnversation.unreadMsgCountLeftUser += 1;
            await newStartedCnversation.save();
            //Emit the event
            obj.io.emit("indChat", newindividualChatMsg)
            res.sendStatus(200)
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
        conversation[0].unreadMsgCountRightUser = 0;
        await conversation[0].save();
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
    await db.StartedConversations.find({leftUser:req.body.SenderName, rightUser:req.body.ReceiverName}, async function(err, conversation) {
      if(err) {
        res.send(err);
        return;
      }
      if(conversation.length) {
        check = true;
        conversation[0].unreadMsgCountLeftUser = 0;
        await conversation[0].save();
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


module.exports = router;
