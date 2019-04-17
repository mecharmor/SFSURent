const passport = require('passport');
const mysql = require('mysql');
const { Strategy } = require('passport-local');

const debug = require('debug')('app:local-strategy');


const mysql_config = {
  host: '18.144.46.90',
  user: 'team11',
  password: 'csc648Team11@',
  port: 3306,
  database: 'team11db',
};

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const DATABASE = new Database(mysql_config); // global database reference

async function getUser(email) {
  try {
    const rows = await DATABASE.query('SELECT * FROM users WHERE email = ?', email);
    return rows[0];
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = function localStrategy() {
  debug('localStrategy');

  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    const user = {
      username,
      passport,
    };
    getUser(username).then((user) => {
      if (user.password === password) {
        debug(user, 'localStrategy');

        done(null, user);
      } else {
        done(null, false);
      }
    }).catch((err) => {
      debug(err);
    });
  }));
};
