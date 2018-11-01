var mongoose = require("mongoose");

var Schema = mongoose.Schema;

userSchema = new Schema({
    userName: {type: String, required: true, unique: true, dropDups: true}
});

module.exports.userschema = userSchema

