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
      host: '18.144.46.90',
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




/*
Here we will drop the tables and create them again..
*/
mysqlRouter.route('/refresh')
  .get((req, res) => {

    database = new Database(mysql_config);

    database.query( 'DROP TABLE IF EXISTS some_table' )
      .then( database.query('Create TABLE some_table ( ' + 
          'testid int,' +
          'name VARCHAR(255)'+
          ')'
        ))
      .then( res.send("done"));


  });




/*
Here we can insert some sample data in our listing table
*/
mysqlRouter.route('/insert')
  .get((req, res) => {

    database = new Database(mysql_config);

    database.query( 'INSERT INTO some_table SET testid = 1, name = "myname"' )
      .then( rows => database.query( 'SELECT * FROM some_table' ) )
      .then( rows => res.send(rows) );
  });




module.exports = mysqlRouter;
