var conversationHandler = require('./ConversationHandler');
var conversationUtil = require('./ConversationUtil');

async function getConversationsFromDatabase(body) {
    const resultList = await conversationHandler.getConversations();
    const resultArray = conversationUtil.processResultList(body,resultList);
    return resultArray;
}

async function getConversationsWithreducedMsgCount(body) {
    const conversationList = await conversationHandler.getConversations();
    const conversationObject = conversationUtil.reduceUnreadMsgCountFromConversation(body,conversationList)
    if(conversationObject) {
        await conversationHandler.saveObject(conversationObject);
        return true;
    }
    else {
        return false
    }
}

module.exports.getConversationsFromDatabase = getConversationsFromDatabase;
module.exports.getConversationsWithreducedMsgCount = getConversationsWithreducedMsgCount;