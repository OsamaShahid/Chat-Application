var db = require('../database');
class IndividualChatHandler{
    static async getIndividualChat(id) {
        const individChat =  await db.individualChats.find({conversationId: id});
        return individChat;
    }
    static async saveNewDocumentObject(documentObject) {
        var chat = new db.individualChats(documentObject);
        await chat.save();
        return chat;
    }
};

module.exports = IndividualChatHandler;
