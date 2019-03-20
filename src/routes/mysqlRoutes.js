var express = require('express');
var mysqlRouter = express.Router();
const mysql = require('mysql');



    // const connection = mysql.createConnection({
    //   host: 'team11-db-instance.chozbodasabv.us-west-1.rds.amazonaws.com',
    //   user: 'team11master',
    //   password: 'csc648team11',
    //   port: 3306,
    //   database: 'team11db',
    // });



const mysql_config = {
      host: 'localhost',
      user: 'team11',
      password: 'csc648Team11@',
      port: 3306,
      database: 'team11db',
    };

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}




mysqlRouter.route('/refresh')
  .get((req, res) => {

    database = new Database(mysql_config);

    database.query( 'SELECT * FROM some_table' )
      .then( rows => database.query( 'SELECT * FROM other_table' ) )
      .then( rows => database.close() );


  });





mysqlRouter.route('/test')
  .get((req, res) => {

    // const connection = mysql.createConnection({
    //   host: 'team11-db-instance.chozbodasabv.us-west-1.rds.amazonaws.com',
    //   user: 'team11master',
    //   password: 'csc648team11',
    //   port: 3306,
    //   database: 'team11db',
    // });

    const connection = mysql.createConnection();


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
