let path = require("path");
let express = require("express");
var formidable = require('formidable');
var mv = require('mv');

//Look at below web page for info on express.Router()
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
let router = express.Router();

//request is info sending to server from client.
//response is info sending to client from server.

router.get("/",function(req,res){
  res.sendFile(path.resolve(__dirname + "/public/views/index.html"));  //changed
});
router.get("/profile",function(req,res){
  res.sendFile(path.resolve(__dirname + "/public/views/profile.html"));  //changed
});
router.get("/survey",function(req,res){
  res.sendFile(path.resolve(__dirname + "/public/views/survey.html"));  //changed
});


const myDatabase = require('./myDatabase');
let db = new myDatabase();

const mymessDatabase = require('./messageDatabase');
let messageDb = new mymessDatabase();
const MessageData = require('./message');


let messageID = 1;
const Data = require('./Data');
let filename2;
/////Dummy Account for tests//////
{
let obj = new Data('abc','abc',-1,'abc');
let val = db.postData(obj);
}
//////////////////////////////////
router.post('/fileupload', function(req, res) {
    console.log("router.post fileupload");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.image.path;
        var newpath = __dirname + '/public/images/' + files.image.name;
        console.log('Received image: ' + files.image.name);
        mv(oldpath, newpath, function (err) {
//            if (err) throw err;
            if (err)
                res.json({error:true});
            else
                res.json({error:false,filename2: files.image.name });
        });
    });
});

/////Checks Login Info//////
////////////////////////////////////////////////////////////////////////////////
router.post('/storeMessage', function(req, res){
  let message = req.body.message.trim();
  let id = req.body.id.trim();
  let user = req.body.user.trim();
  console.log(message);
  console.log(id);
  console.log(user);
 //let survey= req.body.survey.trim();

  if (message == "") {
      res.json({error:true,message:"Bad Message"});
      return;
  }

  let obj = new MessageData(message,id,user); //the -1 is temporary, is the yee rating
  let val = messageDb.postData(obj);
  messageID++;
  console.log(val);
  if (val)
    res.json({error:false});
  else
    res.json({error:true});

});
router.get('/getstoredMessages', function(req, res){

  let chat = "";
  console.log(messageDb.getmessageLength());
  if(messageDb.getmessageLength()>0){
  for(let i =0; i<messageDb.getmessageLength();i++)
  {
    let newMessage = messageDb.getData(i);
    console.log(messageDb.getData(i));
    chat += "<fieldset>"+
              '<p>'+ "Rating: " + " Username: " + newMessage.user +" "+  newMessage.message + '</p>'+

              "<button type="+ "button"+
              " class="+ "collapsible"+
              " id =" + newMessage.id +
              //"onclick=" +"collapseIt()"+
              ">Comments</button>"+

              "<div id =" + "d"+ newMessage.id + " class="+ "content"+"> " +"<hr>"
                +"<ul id=" + "p"+ newMessage.id + "></ul>" + "<br>"
                + "<input id =" + "t" + newMessage.id + " type="+ "text"+">"
                +"<input id =" + "c"+ newMessage.id + " type=button name=commentb value=PostComment onclick= " + "commentit("+  newMessage.id + ")>" +"<br>"
              +"</div>"
              +"</fieldset>"
  }
}
console.log(chat);
  res.json({test:chat});
});
router.get('/getMessageid', function(req, res){

  res.json(messageID);
});



///////////////////////////////////////Message Database Code///////////////////////
router.get('/check', function(req, res){
  let username = req.query.username.trim();
  let password = req.query.password.trim();

  if (username == "") {
    res.json({error:true,message:"Username is required"});
    return;
  }
  if (password == "") {
          res.json({error:true,message:"Password is required"});
      return;
  }
  let val = db.getData(username,password);
    if (val == null)
        res.json({error:true,message:'Incorrect username or password'});
    else
    {
      res.json({error:false});
    }
});
router.get('/getSurvey', function(req, res){

  let username = req.query.username.trim();
  let password = req.query.password.trim();

  if (username == "") {
    res.json({error:true,message:"Username is required"});
    return;
  }
  if (password == "") {
          res.json({error:true,message:"Password is required"});
      return;
  }
  let val = db.getData(username,password);
    if (val == null)
        res.json({error:true,message:'Incorrect username or password'});
    else
    {
      res.json({error:false, value:val});
    }
});
router.post('/create', function(req, res){
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  filename2 = req.body.filename2.trim();

  if (username == "") {
      res.json({error:true,message:"Username is required"});
      return;
  }
  if (password == "") {
      res.json({error:true,message:"Password is required"});
      return;
  }
  if (filename2 == "") {
      res.json({error:true});
      return;
  }

  let obj = new Data(username,filename2,(-1),password); //the -1 is temporary, is the yee rating
  let val = db.postData(obj);
  if (val)
    res.json({error:false,filename2:filename2});
  else
    res.json({error:true});

});
router.put('/update', function(req, res){
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  filename2 = req.body.filename2.trim();

  if (username == "") {
      res.json({error:true,message:"Username is required"});
      return;
  }
  if (password == "") {
      res.json({error:true,message:"Password is required"});
      return;
  }
  if (filename2 == "") {
      res.json({error:true});
      return;
  }

  let obj = new Data(username,filename2,(db.getData(username,password).rating),password); //the -1 is temporary, is the yee rating
  let val = db.putData(obj);
  if (val)
    res.json({error:false,filename2:filename2});
  else
    res.json({error:true,message:"Incorrect username or password"});

});
router.post('/surveySubmit', function(req, res){
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let num = parseInt(req.body.surveyNumber);

  if (db.getData(username,password) && db.getData(username,password).rating >= 0) {
    res.json({error:true,message:"the survey has already been taken on this account"});
    return;
  }
  let done = false;
  for(let i=10; i>0; i--) {
    if(num >= (4*i) && !done) {
      num = i;
      done = true;
    }
  }
  console.log("Yee survey num: "+num);
  let tempData = db.getData(username,password);
  let obj = new Data(username,tempData.profilepic,num,password); //the 5 is temporary, is the yee rating
  let val = db.putData(obj);
  if (val)
    res.json({error:false,num:num});
  else
    res.json({error:true,message:"Incorrect username or password"});

});

module.exports = router;
