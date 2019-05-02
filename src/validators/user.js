/*
Author: Soheil Ansari
Date: 5/1/19
Description: Validation rules for users.
*/
const { check } = require('express-validator/check');

module.exports.validateLogin = () => [
  check('email', 'Invalid email').exists().isEmail(),
  check('password').exists().isLength({ min: 6, max: 18 }),
];

module.exports.validateCreateUser = () => [
  check('name', 'Name must be only characters and spaces.').exists().matches(/^[a-z ]+$/i),
  check('email', 'Invalid email').exists().isEmail(),
  check('password', 'Password must be between 6 and 18 characters.').exists().isLength({ min: 6, max: 18 }),
  check('password_confirm').custom((value, { req }) => {
    if (value !== req.body.password_confirm) {
      throw new Error('Password confirmation does not match password');
    }
  }),
];