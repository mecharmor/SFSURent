/*
Author: Soheil Ansari
Date: 4/18/19
Description: Routes for authentication
*/

const express = require('express');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    console.log(req.body.name);
    res.send('done');
  });

authRouter.route('/login')
  .get((req, res) => {
    res.render('register');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/dashboard/',
    failureRedirect: '/auth/login/?failed=true',
    failureFlash: false,
  }));

module.exports = authRouter;
