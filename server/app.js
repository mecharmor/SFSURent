var express = require('express');

/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js" to get messages for this file only. */
var debug = require('debug')('app');

/* Morgan is used for logging http request in the console */
var morgan = require('morgan');

var app = express();

app.use(morgan('tiny'))


app.get('/', function(req, res){
  res.send('Hello from express!');
})


// listening
app.listen(3000, function(){
  debug('listening on port 3000');
});