const passport = require('passport');
require('./strategies/local-strategy.js')();
const debug = require('debug')('app:passport');

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = passportConfig;
