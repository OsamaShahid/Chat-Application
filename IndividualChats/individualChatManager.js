const individualChatHandler = require('./individualChatHandler');
const conversationHandler = require('../StartedConversations/ConversationHandler');
const individualChatUtil = require('./individualChatUtil');
const conversationUtil = require('../StartedConversations/ConversationUtil');
var db = require('../database');

async function getIndividualChatFromDataBase(receivername,sendername,check) {
    const conv = await conversationHandler.getConversation(receivername,sendername);
    if(conversationUtil.isvalidConversation(conv)) {
        if(check)
        {
            conv[0].unreadMsgCountRightUser = 0;
        }
        else {
            conv[0].unreadMsgCountLeftUser = 0;
        }
        await conversationHandler.saveObject(conv[0]);
        const indvidualChat = await individualChatHandler.getIndividualChat(conv[0]._id);
        if(individualChatUtil.isValidIndividualChat(indvidualChat)) {
            return indvidualChat;
        }
        else {
            return false
        }
    }
    else {
        return false;
    }
}

async function saveIndividChatMessageInDatabase(body)
{
    const conv = await conversationHandler.getConversation(body.SenderName,body.ReceiverName);
    if(conv.length) {
        var newindividualChatMsg = {
            conversationId: conv[0]._id,
            senderName: body.SenderName,
            receiverName: body.ReceiverName,
            TimeOfsending: body.currentDateTime,
            chatImage: body.chatImage,
            chatMessage: body.chat
        };
        const chatMsg = await individualChatHandler.saveNewDocumentObject(newindividualChatMsg);
        conv[0].date = body.currentDateTime;
        conv[0].lastMessage = body.chat;
        conv[0].unreadMsgCountRightUser += 1;
        await conversationHandler.saveObject(conv[0]);
        return chatMsg
    }
    else {
        const conve = await conversationHandler.getConversation(body.ReceiverName,body.SenderName);
        if(conve.length) {
            var newindividualChatMsg = {
                conversationId: conve[0]._id,
                senderName: body.SenderName,
                receiverName: body.ReceiverName,
                TimeOfsending: body.currentDateTime,
                chatImage: body.chatImage,
                chatMessage: body.chat
            };
            const chatMsg = await individualChatHandler.saveNewDocumentObject(newindividualChatMsg);
            conve[0].date = body.currentDateTime;
            conve[0].lastMessage = body.chat;
            conve[0].unreadMsgCountLeftUser += 1;
            await conversationHandler.saveObject(conve[0]);
            return chatMsg
        }
        else {
            var newStartedCnversation = {
                id: new db.mongoose.Types.ObjectId(),
                leftUser: body.ReceiverName,
                rightUser: body.SenderName,
                date: new Date(),
                lastMessage: "",
                unreadMsgCountLeftUser: 0,
                unreadMsgCountRightUser: 0
              };
              var newConv = await conversationHandler.saveNewObject(newStartedCnversation);
              var newindividualChatMsg = {
                conversationId: newConv._id,
                senderName: body.SenderName,
                receiverName: body.ReceiverName,
                TimeOfsending: body.currentDateTime,
                chatImage: body.chatImage,
                chatMessage: body.chat
              };
              var chatMessage = await individualChatHandler.saveNewDocumentObject(newindividualChatMsg);
  
              newConv.date = body.currentDateTime;
              newConv.lastMessage = body.chat;
              newConv.unreadMsgCountLeftUser += 1;
              await conversationHandler.saveObject(newConv);
              return chatMessage;
        }
    }
}

async function saveImageChatMessageInDatabase(body,file) {
    const conv = await conversationHandler.getConversation(body.SenderName,body.ReceiverName);
    if(conv.length) {
        var newindividualChatMsg = {
            conversationId: conv[0]._id,
            senderName: body.SenderName,
            receiverName: body.ReceiverName,
            TimeOfsending: body.currentDateTime,
            chatImage: "http://192.168.34.54:4747/uploads/" + file.filename,
            chatMessage: body.chat
        };
        const chatMsg = await individualChatHandler.saveNewDocumentObject(newindividualChatMsg);
        conv[0].date = body.currentDateTime;
        conv[0].lastMessage = body.chat;
        conv[0].unreadMsgCountRightUser += 1;
        await conversationHandler.saveObject(conv[0]);
        return chatMsg
    }
    else {
        const conve = await conversationHandler.getConversation(body.ReceiverName,body.SenderName);
        if(conve.length) {
            var newindividualChatMsg = {
                conversationId: conve[0]._id,
                senderName: body.SenderName,
                receiverName: body.ReceiverName,
                TimeOfsending: body.currentDateTime,
                chatImage: "http://192.168.34.54:4747/uploads/" + file.filename,
                chatMessage: body.chat
            };
            const chatMsg = await individualChatHandler.saveNewDocumentObject(newindividualChatMsg);
            conve[0].date = body.currentDateTime;
            conve[0].lastMessage = body.chat;
            conve[0].unreadMsgCountLeftUser += 1;
            await conversationHandler.saveObject(conve[0]);
            return chatMsg
        }
        else {
            var newStartedCnversation = {
                id: new db.mongoose.Types.ObjectId(),
                leftUser: body.ReceiverName,
                rightUser: body.SenderName,
                date: new Date(),
                lastMessage: "",
                unreadMsgCountLeftUser: 0,
                unreadMsgCountRightUser: 0
              };
              var newConv = await conversationHandler.saveNewObject(newStartedCnversation);
              var newindividualChatMsg = {
                conversationId: newConv._id,
                senderName: body.SenderName,
                receiverName: body.ReceiverName,
                TimeOfsending: body.currentDateTime,
                chatImage: "http://192.168.34.54:4747/uploads/" + file.filename,
                chatMessage: body.chat
              };
              var chatMessage = await individualChatHandler.saveNewDocumentObject(newindividualChatMsg);
  
              newConv.date = body.currentDateTime;
              newConv.lastMessage = body.chat;
              newConv.unreadMsgCountLeftUser += 1;
              await conversationHandler.saveObject(newConv);
              return chatMessage;
        }
    }
}

module.exports.getIndividualChatFromDataBase = getIndividualChatFromDataBase;
module.exports.saveIndividChatMessageInDatabase = saveIndividChatMessageInDatabase;
module.exports.saveImageChatMessageInDatabase = saveImageChatMessageInDatabase;