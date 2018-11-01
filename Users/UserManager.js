var userHandler = require("./UserHandler")

function saveUserMiddleware(body) {
    var userArrived = {
        userName: body.username
    };
    return userHandler.makeNewUser(userArrived);
}

async function getUserFromDatabase(body) {
    const user = await userHandler.getUser(body.username);
    if(user) {
        return user;
    }
    else {
        return false;
    }
}

async function getParticepentsFromDataBase() {
    const users = await userHandler.getAllUsers();
    return users;
}

module.exports.saveUserMiddleware = saveUserMiddleware;
module.exports.getUserFromDatabase = getUserFromDatabase;
module.exports.getParticepentsFromDataBase = getParticepentsFromDataBase;