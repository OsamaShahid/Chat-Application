var db = require('../database');

async function getConversations() {
    const resultList = await db.StartedConversations.find({});
    return resultList;
}

async function saveObject(documentObject) {
    await documentObject.save();
}


module.exports.getConversations = getConversations;
module.exports.saveObject = saveObject;