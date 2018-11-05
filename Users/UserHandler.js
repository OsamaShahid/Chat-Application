const db = require('../database');

class UserHndler {
    makeNewUser(userarrived) {
        var newUser = new db.Users(userarrived);
        newUser.save()
        return newUser;
    }
    
    async getUser(username) {
        const user = await db.Users.find({userName: username});
        return user;
    }
    
    async getAllUsers() {
        const users = db.Users.find({});
        return users;
    }
};


module.exports = UserHndler;