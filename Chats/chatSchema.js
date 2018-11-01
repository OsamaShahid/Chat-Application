var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChatsSchema = new Schema({
    name: {type: String, ref:'Users'},
    chat: String,
    chatImage: {type: String}
  });

  module.exports.chatschema = ChatsSchema;