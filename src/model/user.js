/*
Author: Soheil Ansari
Date: 4/18/19
Description: User Model and specific functions relating to the user
*/

class User {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  static register(name, email, pass) {
    global.DATABASE.query('INSERT INTO users (name, email, password) VALUES (?,?,?) ',
      [name, email, pass])
      .then((results) => {
        console.log('Registered');
        console.log(results.insertId);
        return results.insertId;
      });
    const sql = '';
    return sql;
  }

  static async checkValid(email, pass) {
    return global.DATABASE.query('SELECT * FROM users WHERE email = ?', email)
      .then((rows) => {
        if (!rows || rows == null || rows.length !== 1) {
          return false;
        }
        if (rows[0].password === pass) {
          return true;
        }
        return false;
      });
  }
}

module.exports.User = User;
