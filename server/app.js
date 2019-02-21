var express = require('express');

/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js" to get messages for this file only. */
var debug = require('debug')('app');

/* Morgan is used for logging http request in the console */
var morgan = require('morgan');

var app = express();
var router = express.Router();
var path = __dirname + '/views/';
  
app.use('/',router);
app.use(morgan('tiny'))
app.set('view engine', 'ejs');

/*allows to call static items in pulic folder such as images*/
app.use('/public', express.static(__dirname + "/public"));
  
router.get('/',function(req, res){
  res.render('index', {testData : "My Test Data From Node"});
});


router.get('/about/cory-lewis',function(req, res){
  res.sendFile(path + 'about/cory.html');
});
router.get('/about/david-dropping',function(req, res){
  res.sendFile(path + 'about/david.html');
});
router.get('/about/soheil-ansari',function(req, res){
  res.sendFile(path + 'about/soheil.html');
});
router.get('/about/xinyu-zou',function(req, res){
  res.sendFile(path + 'about/xinyu.html');
});
router.get('/about/poorva-rathi',function(req, res){
  res.sendFile(path + 'about/poorva.html');
});
router.get('/about/chintan-puri',function(req, res){
  res.sendFile(path + 'about/chintan.html');
});
router.get('/about/junwei-liang',function(req, res){
  res.sendFile(path + 'about/junwei.html');
});
router.get('/about',function(req, res){
  res.sendFile(path + 'about/about.html');
});


app.listen(3000, function(){
  debug('listening on port 3000');
});