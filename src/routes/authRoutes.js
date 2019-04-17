var express = require('express');
var authRouter = express.Router();

authRouter.route('/login/')
  .post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


// Main About Page
authRouter.route('/signup/')
  .get((req, res) => {
    res.render('about/index');
  })
  .post((req, res) => {
    res.render('about/index');
  });

module.exports = authRouter;
