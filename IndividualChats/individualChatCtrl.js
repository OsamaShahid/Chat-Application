const individualChatManager = require('./individualChatManager');

async function getIndividChat(req,res,next) {
    try {
        const convList = await individualChatManager.getIndividualChatFromDataBase(req.body.ReceiverName,req.body.SenderName,true);
        if(convList) {
            console.log(convList);
            res.send({
              check: true,
              chatList: convList
            });
        }
        else {
            res.send({check: false});
        } 
    } catch (error) {
        console.log(error);
        res.send({check: false});
    }
}

async function getIndividChatR(req,res,next) {
    try {
        const convList = await individualChatManager.getIndividualChatFromDataBase(req.body.SenderName,req.body.ReceiverName,false);
        if(convList.length) {
            console.log(convList);
            res.send({
              check: true,
              chatList: convList
            });
        }
        else {
            res.send({check: false});
        } 
    } catch (error) {
        console.log(error);
        res.send({check: false});
    }
}

async function saveIndividualChatMessage(req,res,next) {
    try {
        const newChatMessage = await individualChatManager.saveIndividChatMessageInDatabase(req.body);
        require('../bin/www').io.emit("indChat", newChatMessage);
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.send(error);
        return;
    }
}

async function saveIndividualImageChatMessage(req,res,next) {
    try {
        const newChatMessage = await individualChatManager.saveIndividChatMessageInDatabase(req.body,req.file);
        require('../bin/www').io.emit("indChat", newChatMessage);
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.send(error);
        return;
    }
}

module.exports.getIndividChat = getIndividChat;
module.exports.getIndividChatR =getIndividChatR;
module.exports.saveIndividChatMessage = saveIndividualChatMessage;
module.exports.saveIndividualImageChatMessage = saveIndividualImageChatMessage;