var db = require('../database');

async function getChats() {
    const chats = await db.Chats.find({});
    return chats;
}

async function saveDocument(documentObject) {
    var chat = new db.Chats(documentObject)
    await chat.save()
    return chat;
}

module.exports.getChats = getChats;
module.exports.saveDocument = saveDocument;