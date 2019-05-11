const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator')
/* Morgan is used for logging http request in the console */
const morgan = require('morgan');
/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js"
to get messages for this file only. */
const debug = require('debug')('app');

// will allow to get form submited data using request.body
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

// use express session
app.use(
  session({
    secret: 'CSC Class',
    saveUninitialized: false,
    resave: false,
  }),
);

require('./src/config/passport.js')(app);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

function authProtect(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isBlocked === 1) {
      res.redirect('/contact/admin');
    } else {
      next();
    }
  } else {
    res.redirect('/auth/login');
  }
}

app.use(morgan('tiny'));

/* allows to call static items in public folder such as images */
app.use(express.static('./public'));

const aboutRouter = require('./src/routes/aboutRoutes');
const mysqlRouter = require('./src/routes/mysqlRoutes');
const listingRoutes = require('./src/routes/listingRoutes');
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

// USE ROUTES
app.use('/about/', aboutRouter);
app.use('/mysql/', mysqlRouter);
app.use('/listing/', listingRoutes);
app.use('/auth/', authRoutes);
app.use('/dashboard/', authProtect, dashboardRoutes);

app.get('/', (req, res) => {
  res.redirect('/listing/');
  // res.render('listing/index');
});

app.get('/contact/admin', (req, res) => {
  res.render('contact-admin');
  // res.render('listing/index');
});

app.listen(80, () => {
  debug('listening on port 80');
});
