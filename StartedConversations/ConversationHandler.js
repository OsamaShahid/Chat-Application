const db = require('../database');

class ConversationHandler {
    async getConversations() {
        const resultList = await db.StartedConversations.find({});
        return resultList;
    }
    
    async saveObject(documentObject) {
        await documentObject.save();
    }
    
    async getConversation(ReceiverName,SenderName) {
        const conv = await db.StartedConversations.find({leftUser:ReceiverName, rightUser:SenderName});
        return conv;
    }
    
    async saveNewObject(documentObject) {
        var conversation = new db.StartedConversations(documentObject);
        conversation.save();
        return conversation;
    }
};

module.exports = ConversationHandler