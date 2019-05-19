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
const request = require('request');
const passport = require('passport');
const { validationResult } = require('express-validator/check');
const { User } = require('../model/user.js');
const { validateCreateUser } = require('../validators/user.js');


const authRouter = express.Router();

authRouter.route('/login')
  .get((req, res) => {
    res.render('register', { login: true, isLoggedIn: req.isAuthenticated() });
  });


authRouter.route('/login/failed')
  .get((req, res) => {
    res.render('register', { login: true, loginError: true, isLoggedIn: req.isAuthenticated() });
  });

authRouter.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

authRouter.route('/register')
  .get((req, res) => {
    res.render('register', { isLoggedIn: req.isAuthenticated() });
  })
  .post(validateCreateUser(), (req, res) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    // fix error
    if (errors.length !== 0) {
      res.render('register', {
        isLoggedIn: req.isAuthenticated(),
        errors,
        body: req.body,
      });
      return;
    }

    // check captcha
    const secretKey = '6LewQqIUAAAAAOhyNFLeE1sS4vXEZDQ_iI87gSTO';
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.recaptcha_response}`;

    request(verificationUrl, (error, response, body) => {
      const parsedBody = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if (parsedBody.success !== undefined && !parsedBody.success) {
        res.render('register', {
          isLoggedIn: req.isAuthenticated(),
          errors: [{ msg: 'Failed captcha verification' }],
          body: req.body,
        });
      } else {
        User.register(req.body.name, req.body.email, req.body.password)
          .then((userID) => {
            req.login({ id: userID }, () => res.redirect('/'));
          });
      }
    });
  });

authRouter.route('/login')
  .get((req, res) => {
    res.render('register', { isLoggedIn: req.isAuthenticated() });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/dashboard/',
    failureRedirect: '/auth/login/failed',
    failureFlash: false,
  }));

module.exports = authRouter;
