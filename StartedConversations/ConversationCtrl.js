var conversationManager = require('./ConversationManager')

async function getConversationsResult(req,res,next) {
    try {
        var resultArray = await conversationManager.getConversationsFromDatabase(req.body);
        if(resultArray) {
            res.send({
                check: true,
                conversations: resultArray
            });
        }
        else {
            res.send({
                check: false,
            });
        }
    }
    catch(error) {
        console.log(error);
        res.send({check: false});
    }
}

async function reduceUnreadMessageCount(req,res,next) {
    try {
        const result = await conversationManager.getConversationsWithreducedMsgCount(req.body);
        if(result)
        {
            res.send({check: true});
        }
        else {
            res.send({check: false});
        }
    } catch (error) {
        res.send({check: false});
    }
}

module.exports.getConversationsResult = getConversationsResult;
module.exports.reduceUnreadMessageCount = reduceUnreadMessageCount;