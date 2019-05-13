let express = require('express');
let aboutRouter = express.Router();

// Main About Page
aboutRouter.route('/')
  .get((req, res) => {
    res.render('about/index', { isLoggedIn: req.isAuthenticated() });
  });
// Personal About Pages
aboutRouter.route('/soheil-ansari')
  .get((req, res) => {
    res.render('about/soheil', { isLoggedIn: req.isAuthenticated() });
  });
aboutRouter.route('/cory-lewis')
  .get((req, res) => {
    res.render('about/cory', { isLoggedIn: req.isAuthenticated() });
  });
aboutRouter.route('/chintan-puri')
  .get((req, res) => {
    res.render('about/chintan', { isLoggedIn: req.isAuthenticated() });
  });
aboutRouter.route('/xinyu-zou')
  .get((req, res) => {
    res.render('about/xinyu', { isLoggedIn: req.isAuthenticated() });
  });
aboutRouter.route('/junwei-liang')
  .get((req, res) => {
    res.render('about/junwei', { isLoggedIn: req.isAuthenticated() });
  });
aboutRouter.route('/poorva-rathi')
  .get((req, res) => {
    res.render('about/poorva', { isLoggedIn: req.isAuthenticated() });
  });
aboutRouter.route('/david-dropping')
  .get((req, res) => {
    res.render('about/david', { isLoggedIn: req.isAuthenticated() });
  });
module.exports = aboutRouter;
