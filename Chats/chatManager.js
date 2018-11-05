const ChatHandler = require('./chatHandler');

const chatHandler = new ChatHandler();

class ChatManager {
    async getchatsfromdatabase() {
        const chats = await chatHandler.getChats();
        return chats;
    }
    
    async saveChatInDatabase(body) {
        const chat = await chatHandler.saveDocument(body);
        return chat;
    }
}

module.exports = ChatManager;