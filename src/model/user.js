/*
Author: Soheil Ansari
Date: 4/18/19
Description: User Model and specific functions relating to the user
*/
const bcrypt = require('bcrypt');

const saltRounds = 10;

class User {
  // constructor(height, width) {
  //   this.height = height;
  //   this.width = width;
  // }

  static register(name, email, pass) {
    const hash = bcrypt.hashSync(pass, saltRounds);
    global.DATABASE.query('INSERT INTO users (name, email, password) VALUES (?,?,?) ',
      [name, email, hash])
      .then(results => results.insertId);
  }

  static async checkValid(email, pass) {
    return global.DATABASE.query('SELECT * FROM users WHERE email = ?', email)
      .then((rows) => {
        if (!rows || rows == null || rows.length !== 1) {
          return false;
        }
        return bcrypt.compareSync(pass, rows[0].password);
      });
  }
}

module.exports.User = User;
