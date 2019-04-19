/*
Author: Cory Lewis
Date: 4/17/19
Description: This file holds the pool data for connections and also
keeps reference to the `pool` variable so the class `Database` has access to query() and also 
pre-query tables so they can be quickly retrieved in the future to decrease query time on client side
*/
// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: '18.144.46.90',
//     user: 'team11',
//     password: 'csc648Team11@',
//     database: 'team11db',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

//   class Database {
//       constructor(pool) {
//         this.pool = pool;
//         this.listingTypes;
//         this.storeListingTypes();
//       }
//       storeListingTypes(){
//           this.listingTypes = this.pool.query('SELECT * FROM listing_type').then(result => {
//             this.listingTypes = result;
//           });
//       }
//   }

//   module.exports = new Database(pool);

const mysql = require('mysql');

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

module.exports = new Database(mysql_config);