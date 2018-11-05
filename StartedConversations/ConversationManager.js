const ConversationHandler = require('./ConversationHandler');
const ConversationUtil = require('./ConversationUtil');

const conversationHandler = new ConversationHandler();
const conversationUtil = new ConversationUtil();

class ConversationManager {
    async getConversationsFromDatabase(body) {
        const resultList = await conversationHandler.getConversations();
        const resultArray = conversationUtil.processResultList(body,resultList);
        return resultArray;
    }
    
    async getConversationsWithreducedMsgCount(body) {
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
};

module.exports = ConversationManager;