var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// schema for each started conversation
var StartedConversationsSchema = new Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    leftUser: {type: String, ref:'Users'},
    rightUser: {type: String, ref:'Users'},
    lastMessage: {type: String},
    date: {type: Date},
    unreadMsgCountLeftUser: {type: Number},
    unreadMsgCountRightUser: {type: Number}
  });

  module.exports.startedconversationschema = StartedConversationsSchema;