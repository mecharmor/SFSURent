const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../model/user.js');
const debug = require('debug')('app:local-strategy');

async function getUser(email) {
  try {
    const rows = await global.DATABASE.query('SELECT * FROM users WHERE email = ?', email);
    return rows[0];
  } catch (err) {
    console.log(err.stack);
  }
}

const strategy = new LocalStrategy(
  ((username, password, done) => {

    console.log('Local STARG');
    console.log(username);
    console.log(password);

    User.checkValid(username, password);

    return done(null, username);

    // }, function(err, user) {
    //     if (err) { return done(err); }
    //     if (!user) {
    //       return done(null, false, { message: 'Incorrect username.' });
    //     }
    //     if (!user.validPassword(password)) {
    //       return done(null, false, { message: 'Incorrect password.' });
    //     }
    //     return done(null, user);
    //   });
  }),
);

module.exports = () => {
  passport.use(strategy);
};

// function localStrategy() {
//   debug('localStrategy');

//   passport.use(new Strategy({
//     usernameField: 'username',
//     passwordField: 'password',
//   }, (username, password, done) => {
//     const user = {
//       username,
//       passport,
//     };
//     getUser(username).then((user) => {
//       if (user.password === password) {
//         debug(user, 'localStrategy');

//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     }).catch((err) => {
//       debug(err);
//     });
//   }));
// };
