var db = require('../database');

class ChatHandler {
    static async getChats() {
        const chats = await db.Chats.find({});
        return chats;
    }
    
    static async  saveDocument(documentObject) {
        var chat = new db.Chats(documentObject)
        await chat.save()
        return chat;
    }
};

module.exports = ChatHandler;