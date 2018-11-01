var mongoose = require("mongoose");
var StartedConversationsSchema = require("./startedConversationsSchema").startedconversationschema;

var StartedConversations = mongoose.model('StartedConversations', StartedConversationsSchema);

module.exports.StartedConversations = StartedConversations;