var db = require('../database');

async function getConversations() {
    const resultList = await db.StartedConversations.find({});
    return resultList;
}

async function saveObject(documentObject) {
    await documentObject.save();
}

async function getConversation(ReceiverName,SenderName) {
    const conv = await db.StartedConversations.find({leftUser:ReceiverName, rightUser:SenderName});
    return conv;
}

async function saveNewObject(documentObject) {
    var conversation = new db.StartedConversations(documentObject);
    conversation.save();
    return conversation;
}


module.exports.getConversations = getConversations;
module.exports.saveObject = saveObject;
module.exports.getConversation = getConversation;
module.exports.saveNewObject = saveNewObject;