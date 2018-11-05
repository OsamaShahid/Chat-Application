var db = require('../database');

class ChatHandler {
    async getChats() {
        const chats = await db.Chats.find({});
        return chats;
    }
    
    async  saveDocument(documentObject) {
        var chat = new db.Chats(documentObject)
        await chat.save()
        return chat;
    }
};

module.exports = ChatHandler;