/*
Author: Soheil Ansari
Date: 4/18/19
Description: User Model and specific functions relating to the user
*/
const bcrypt = require('bcryptjs');
const db = require('./database.js');

const saltRounds = 10;

class User {
  // constructor(height, width) {
  //   this.height = height;
  //   this.width = width;
  // }

  static register(name, email, pass) {
    const hash = bcrypt.hashSync(pass, saltRounds);
    return db.query('INSERT INTO users (name, email, password) VALUES (?,?,?) ',
      [name, email, hash])
      .then((results) => {
        return results[0].insertId;
      });
  }

  static async checkValid(email, pass) {
    return db.query('SELECT * FROM users WHERE email = ?', email)
      .then(([rows, fields]) => {
        if (!rows || rows == null || rows.length !== 1) {
          return false;
        }
        if(bcrypt.compareSync(pass, rows[0].password)){
          return rows[0];
        }else{
          return false;
        }
      });
  }
}

module.exports.User = User;
