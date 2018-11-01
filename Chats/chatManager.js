var chatHandler = require('./chatHandler');

async function getchatsfromdatabase() {
    const chats = await chatHandler.getChats();
    return chats;
}

async function saveChatInDatabase(body) {
    const chat = await chatHandler.saveDocument(body);
    return chat;
}

module.exports.getchatsfromdatabase = getchatsfromdatabase;
module.exports.saveChatInDatabase = saveChatInDatabase;