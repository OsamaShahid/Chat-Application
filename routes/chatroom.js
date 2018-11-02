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

router.post('/indvidimg/upload', upload.single("msgfile"), individualChatCtrl.saveIndividualImageChatMessage);

router.post('/putIndChats', individualChatCtrl.saveIndividChatMessage);

router.post("/getallindchat", individualChatCtrl.getIndividChat);

router.post("/getallindchatR", individualChatCtrl.getIndividChatR);


module.exports = router;
