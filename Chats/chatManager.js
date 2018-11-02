const ChatHandler = require('./chatHandler');

class ChatManager {
    static async getchatsfromdatabase() {
        const chats = await ChatHandler.getChats();
        return chats;
    }
    
    static async saveChatInDatabase(body) {
        const chat = await ChatHandler.saveDocument(body);
        return chat;
    }
}

module.exports = ChatManager;