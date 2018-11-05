const db = require('../database');
class IndividualChatHandler{
    async getIndividualChat(id) {
        const individChat =  await db.individualChats.find({conversationId: id});
        return individChat;
    }
    async saveNewDocumentObject(documentObject) {
        var chat = new db.individualChats(documentObject);
        await chat.save();
        return chat;
    }
};

module.exports = IndividualChatHandler;
