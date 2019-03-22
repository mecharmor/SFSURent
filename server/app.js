const express = require('express');

const app = express();
app.set('view engine', 'ejs');

/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js"
to get messages for this file only. */
const debug = require('debug')('app');

/* Morgan is used for logging http request in the console */
const morgan = require('morgan');

app.use(morgan('tiny'));

/* allows to call static items in pulic folder such as images */
app.use('/public', express.static(__dirname + "/public"));

const aboutRouter = require('./routes/aboutRoutes');
const mysqlRouter = require('./routes/mysqlRoutes');
const listingRoutes = require('./routes/listingRoutes');

app.use('/about/', aboutRouter);
app.use('/mysql/', mysqlRouter);
app.use('/listing/', listingRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, function () {
  debug('listening on port 3000');
});