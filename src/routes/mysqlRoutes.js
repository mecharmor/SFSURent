var express = require('express');
var mysqlRouter = express.Router();
const mysql = require('mysql');

mysqlRouter.route('/')
  .get((req, res) => {
    const connection = mysql.createConnection({
      host: 'team11-db-instance.chozbodasabv.us-west-1.rds.amazonaws.com',
      user: 'team11master',
      password: 'csc648team11',
      port: 3306,
      database: 'team11db',
    });

    connection.connect(function (err) {
      if (err) {
        res.send("Connection failed");
        return;
      }

      // insert a timestamp into the table
      var sql = "INSERT INTO test_table SET time = CURRENT_TIMESTAMP";
      connection.query(sql, function (err, result) {
        if (err) {
          res.send(err);
          return;
        }
      });
      // output the data
      connection.query("SELECT * FROM test_table ORDER BY time DESC", function (err, result, fields) {
        if (err) {
          res.send(err);
          return;
        } else {
          res.send(result);
          connection.end();
        }
      });
    });
  });
module.exports = mysqlRouter;
