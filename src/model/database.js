/*
Author: Cory Lewis
Date: 4/17/19
Description: This file holds the pool data for connections and also
keeps reference to the `pool` variable so the class `Database` has access to query() and also 
pre-query tables so they can be quickly retrieved in the future to decrease query time on client side
*/
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '18.144.46.90',
    user: 'team11',
    password: 'csc648Team11@',
    database: 'team11db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  class Database {
      constructor(pool) {
          this.pool = pool;//save pool variable
        //   this.listingTypes = [
        //       "apartment", 
        //       "bungalow",
        //       "room"
        //   ];
        this.listingTypes;
        this.storeListingTypes();//store listing_type table promise array in listingTypes for future use
      }
      storeListingTypes(){
          this.listingTypes = this.pool.query('SELECT * FROM listing_type').then(result => {
            this.listingTypes = result;
          });
      }
  }

  module.exports = new Database(pool);