var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// schema for conversation messages
var individualChatSchema = new Schema({
    conversationId: {type: mongoose.Schema.Types.ObjectId, ref: 'StartedConversations'},
    senderName: {type: String},
    receiverName: {type: String},
    TimeOfsending: {type: Date},
    chatImage: {type: String},
    chatMessage: {type: String}
});

module.exports.individualchatschema = individualChatSchema;