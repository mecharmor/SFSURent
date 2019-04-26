const express = require('express');
var https = require('https');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');

// will allow to get form submited data using rrequest.body
app.use(express.urlencoded());

/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js"
to get messages for this file only. */
const debug = require('debug')('app');

/* Morgan is used for logging http request in the console */
const morgan = require('morgan');

app.use(morgan('tiny'));

/* allows to call static items in public folder such as images */
app.use(express.static('./public'));

const aboutRouter = require('./src/routes/aboutRoutes');
const mysqlRouter = require('./src/routes/mysqlRoutes');
const listingRoutes = require('./src/routes/listingRoutes');

//USE ROUTES
app.use('/about/', aboutRouter);
app.use('/mysql/', mysqlRouter);
app.use('/listing/', listingRoutes);

//LANDING PAGE ROUTE
app.get('/', (req, res) => {
  res.redirect('/listing/');
});

//REGISTER ROUTE
app.get('/register', (req, res) => {
  res.render('register');
});

//DASHBOARD ROUTE
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

//CONNECT TO PORT
app.listen(80, function() {
  debug('listening on port 80');
});
