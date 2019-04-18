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

  // async function getListingTypes(){
  //   let result = pool.query('SELECT * FROM listing_type')
  // }



  module.exports = pool;