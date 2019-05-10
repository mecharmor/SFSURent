/*
Author: Soheil Ansari
Date: 4/18/19
Description: Routes for authentication

  For register route we have access to the following:
  req.body.name
  req.body.email
  req.body.password
  req.body.password_confirm
*/

const express = require('express');
const passport = require('passport');
const { validationResult } = require('express-validator/check');
const { User } = require('../model/user.js');
const { validateCreateUser } = require('../validators/user.js');


const authRouter = express.Router();

authRouter.route('/login')
  .get((req, res) => {
    res.render('register', { login: true });
  });

authRouter.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(validateCreateUser(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    User.register(req.body.name, req.body.email, req.body.password);
    return res.send('done');
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
