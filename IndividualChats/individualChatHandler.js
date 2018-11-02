var db = require('../database');

async function getIndividualChat(id) {
    const individChat =  await db.individualChats.find({conversationId: id});
    return individChat;
}

async function saveNewDocumentObject(documentObject) {
    var chat = new db.individualChats(documentObject);
    await chat.save();
    return chat;
}

module.exports.getIndividualChat = getIndividualChat;
module.exports.saveNewDocumentObject = saveNewDocumentObject;
