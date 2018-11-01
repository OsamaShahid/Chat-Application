var userManager = require("./UserManager");

async function setUserName (req, res, next) {
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

async function Login(req,res,next) {
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

async function validateSession(req,res,next) {
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

async function getParticepents(req,res,next) {
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

module.exports.setUserName = setUserName;
module.exports.Login = Login;
module.exports.getParticepents = getParticepents;
module.exports.validateSession = validateSession;