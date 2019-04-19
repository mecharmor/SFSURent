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

  static checkValid(email, pass) {
    global.DATABASE.query('SELECT * FROM users WHERE email = ?', email)
      .then((results) => {
        console.log(results);
        console.log(pass);
      });
    const sql = '';
    return sql;
  }
}

module.exports.User = User;
