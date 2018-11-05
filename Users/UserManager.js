const UserHandler = require("./UserHandler")
const userHandler = new UserHandler();

class UserManager {
    saveUserMiddleware(body) {
        var userArrived = {
            userName: body.username
        };
        return userHandler.makeNewUser(userArrived);
    }
    
    async getUserFromDatabase(body) {
        const user = await userHandler.getUser(body.username);
        if(user) {
            return user;
        }
        else {
            return false;
        }
    }
    
    async getParticepentsFromDataBase() {
        const users = await userHandler.getAllUsers();
        return users;
    }
};

module.exports = UserManager;