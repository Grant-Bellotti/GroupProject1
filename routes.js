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


const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Data = require('./Data');

router.post('/fileupload', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + '/public/images/' + files.filetoupload.name;
      let picture = files.filetoupload.name;
      mv(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
});

router.post('/create', function(req, res){
  let trimIdentifier = req.body.identifier.trim();
  let identifier = Number(trimIdentifier);
  let name = req.body.name.trim();
  let type = req.body.type;
  let rating = Number(req.body.rating);
  let image = path.basename(req.body.image);

  if (trimIdentifier == "") {
    res.json({error:true});
    return;
  }
  if (Number.isNaN(identifier)) {
    res.json({error:true});
    return;
  }
  if (name == "") {
    res.json({error:true});
    return;
  }

  let obj = new Data(identifier,name,type,rating,image);
  let val = db.postData(obj);
  if (val)
    res.json({error:false,image:image});
  else
    res.json({error:true});

});

router.get('/read', function(req, res){
  let trimIdentifier = req.query.identifier.trim();
  let identifier = Number(trimIdentifier);

  if (trimIdentifier == "") {
    res.json({error:true});
    return;
  }
  if (Number.isNaN(identifier)) {
    res.json({error:true});
    return;
  }

  let val = db.getData(identifier);
  if (val == null)
    res.json({error:true});
  else
  {
    res.json({error:false,name:val.name,type:val.type,
              rating:val.rating,image:val.image});
  }

});

router.put('/update', function(req, res){
  let trimIdentifier = req.body.identifier.trim();
  let identifier = Number(trimIdentifier);
  let name = req.body.name.trim();
  let type = req.body.type;
  let rating = Number(req.body.rating);
  let image = path.basename(req.body.image);

  if (trimIdentifier == "") {
    res.json({error:true});
    return;
  }
  if (Number.isNaN(identifier)) {
    res.json({error:true});
    return;
  }
  if (name == "") {
    res.json({error:true});
    return;
  }

  let obj = new Data(identifier,name,type,rating,image);
  let val = db.putData(obj);
  if (val)
    res.json({error:false,image:image});
  else
    res.json({error:true});

});

router.delete('/delete/:identifier', function(req, res){
  let trimIdentifier = req.params.identifier.trim();
  let identifier = Number(trimIdentifier);

  if (trimIdentifier == "") {
    res.json({error:true});
    return;
  }
  if (Number.isNaN(identifier)) {
    res.json({error:true});
    return;
  }

  let val = db.deleteData(identifier);
  if (val == null)
    res.json({error:true});
  else
    res.json({error:false});

});


module.exports = router;
