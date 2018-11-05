const express = require('express');
var router = express.Router();
const multer  = require('multer');

const ConversationCtrl = require('../StartedConversations/ConversationCtrl');
const UserCtrl = require("../Users/UserCtrl");
const ChatCtrl = require('../Chats/chatCtrl');
const IndividualChatCtrl = require('../IndividualChats/individualChatCtrl');

const chatCtrl = new ChatCtrl();
const userCtrl = new UserCtrl();
const conversationCtrl = new ConversationCtrl();
const individualChatCtrl = new IndividualChatCtrl();

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

router.post('/get/particepents',userCtrl.getParticepents);

router.post('/myStartedConersations', conversationCtrl.getConversationsResult);

router.post('/login', userCtrl.Login);

router.post('/reduceIndividChatCount', conversationCtrl.reduceUnreadMessageCount);

router.post('/validateSession', userCtrl.validateSession);

router.post("/putChats", chatCtrl.saveChatMessage);

router.post("/get/chats", chatCtrl.getAllChats)

router.post('/img/upload', upload.single("msgfile") , chatCtrl.saveImageChatMessage);

router.post('/indvidimg/upload', upload.single("msgfile"), individualChatCtrl.saveIndividualImageChatMessage);

router.post('/putIndChats', individualChatCtrl.saveIndividualChatMessage);

router.post("/getallindchat", individualChatCtrl.getIndividChat);

router.post("/getallindchatR", individualChatCtrl.getIndividChatR);


module.exports = router;
