const ChatManager = require('./chatManager');

const chatManager = new ChatManager()

class ChatCtrl {
    async getAllChats(req,res,next) {
        try {
            const allChats = await chatManager.getchatsfromdatabase();
            res.send({
                chatsToSend: allChats,
                check: false
            });
        } catch (error) {
            res.send({check: true});
            console.log(error);
            return;
        }
    }
    
    async saveChatMessage(req,res,next) {
        try {
            const chat = await chatManager.saveChatInDatabase(req.body)
            require('../bin/www').io.emit("onBroadCastMsg", chat)
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
            console.error(error)
        }
    }
    
    async saveImageChatMessage(req,res,next) {
        try {
            const chat = await chatManager.saveChatInDatabase({
                name: req.body.userName,
                chat: req.body.chatMsg,
                chatImage: "http://192.168.34.54:4747/uploads/" + req.file.filename
            });
            require('../bin/www').io.emit("onBroadCastMsg", chat);
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    }
};

module.exports = ChatCtrl;