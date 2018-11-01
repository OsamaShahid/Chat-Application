var db = require('../database');

function makeNewUser(userarrived) {
    var newUser = new db.Users(userarrived);
    newUser.save()
    return newUser;
}

async function getUser(username) {
    const user = await db.Users.find({userName: username});
    return user;
}

async function getAllUsers() {
    const users = db.Users.find({});
    return users;
}

module.exports.makeNewUser = makeNewUser;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;