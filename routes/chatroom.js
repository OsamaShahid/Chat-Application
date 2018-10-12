var express = require('express');
var router = express.Router();
var obj = require('../bin/www');
var db = require('../databaseModels');
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var fs = require('fs');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: '../public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
var type = upload.single('myfile');


/* GET users listing. */
router.get('/:uName', function(req, res, next) {
  res.render('chatroom', {title: 'Welcome to Chat Room', userName: req.params.uName});
  console.log(req.params.uName)
  obj.io.emit("NewUserEntered", req.params.uName);
});

router.post('/img/upload', (req, res) => {
  var tmp_path = req.body.file.path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.body.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { res.send('complete'); });
  src.on('error', function(err) { res.send('error'); });
});

// save a new chat message in database
router.post("/putChats", async (req, res, next) => {
  try {
      var chat = new db.Chats(req.body)
      await chat.save()
      res.sendStatus(200)
      //Emit the event
      obj.io.emit("chat", req.body)
  } catch (error) {
      res.sendStatus(500)
      console.error(error)
  }
})

// Get chat messages from detabase and return to client
router.get("/send/AllChats", function(req,res,next) {
  db.Chats.find({}, (error, chats) => {
      res.send(chats)
  })
  
})



// clear method for clearing the chats
router.post("/clear", function(req,res,next){
  // Remove all chats from collection
  db.Chats.remove({}, function(){
      obj.io.emit('cleared');
  });
})

module.exports = router;
