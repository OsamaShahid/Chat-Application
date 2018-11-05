const UserManager = require("./UserManager");
const userManager = new UserManager();

class UserCtrl {
  async setUserName (req, res, next) {
    try{
      var newUser = await userManager.saveUserMiddleware(req.body);
      res.send({
          user: newUser,
          check: true
      });
    }
    catch(error) {
      console.log(error);
      res.send({check: false});
    }
  }
  
  async Login(req,res,next) {
    try {
      const resUser = await userManager.getUserFromDatabase(req.body)
      if(resUser) {
        res.send(resUser);
        require('../bin/www').io.emit("NewUserJoined", resUser);
        return
      }
      else {
        res.send({check: true});
        return;
      }
    }
    catch(error) {
      res.send(error);
      return;
    }
  }
  
  async validateSession(req,res,next) {
    try {
      const resUser = await userManager.getUserFromDatabase(req.body)
      if(resUser) {
        res.send(resUser);
        require('../bin/www').io.emit("NewUserJoined", resUser);
        return
      }
      else {
        res.send({check: true});
        return;
      }
    }
    catch(error) {
      res.send(error);
      return;
    }
  }
  
  async getParticepents(req,res,next) {
    try {
      const users = await userManager.getParticepentsFromDataBase();
      res.send({
        AllUsers: users,
        check: false
      });
    } catch (error) {
      res.send({check: true});
    }
  }
};

module.exports = UserCtrl;