var express = require('express');
var mysqlRouter = express.Router();
/* const mysql = require('mysql'); */
var https = require('https');

/*
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
*/

// temp code for faking uploading image
let urls = [
"https://upload.wikimedia.org/wikipedia/commons/9/99/Galloway_House.png"
]

var data = '';

var request = https.request(urls[0], function (res) {
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log("Loaded image");
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();



/*
Here we will drop the tables and create them again.. - 3/22/19
*/
mysqlRouter.route('/refresh')
  .get((req, res) => {

    /* database = new Database(mysql_config); */

      DATABASE.query('DROP TABLE IF EXISTS listings')
      
      .then(DATABASE.query('DROP TABLE IF EXISTS listing_type'))

      .then( DATABASE.query('Create TABLE listing_type ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'slug VARCHAR(150) NOT NULL,' +
      'name VARCHAR(150) NOT NULL' +
        ')'
      ))
      
      .then( DATABASE.query('CREATE TABLE listings ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'price double,' +
      'title VARCHAR(150) NOT NULL,' +
      'description VARCHAR(250),' +
      'address VARCHAR(200),' +
      'thumb MEDIUMBLOB,' +
      'zipcode int,' +
      'num_bed int,' +
      'num_bath int,' +
      'size int,' +
      'score int,' +
      'listing_type_id int NOT NULL,' +
      'FOREIGN KEY (listing_type_id) REFERENCES listing_type(id)'+
        ')'
      ))

      .then( res.send('Tables created.'));
    


  });

/*
Here we can insert some sample data in our listing table
*/
mysqlRouter.route('/insert')
  .get((req, res) => {

    /* database = new Database(mysql_config); */

    DATABASE.query( 'DELETE FROM listings' )
      .then(DATABASE.query( 'DELETE FROM listing_type' ))
      .then(DATABASE.query('INSERT INTO listing_type SET id = 1, slug = "apartment", name = "Apartment"' ))
      .then(DATABASE.query('INSERT INTO listing_type SET id = 2, slug = "bungalow", name = "Bungalow"'))
      .then(DATABASE.query('INSERT INTO listing_type SET id = 3, slug = "room", name = "Room"'))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1000.99, ' +
      'title = "title one", ' +
      'description = "description one", ' +
      'address = "address one", ' +
      //'thumb = ?, ' +
      'zipcode = 99, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 5, ' +
      'listing_type_id = 1'
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1999.99, ' +
      'title = "title two", ' +
      'description = "description two", ' +
      'address = "address two", ' +
      'thumb = ?, ' +
      'zipcode = 99444, ' +
      'num_bed = 3, ' +
      'num_bath = 3, ' +
      'size = 3, ' +
      'score = 4, ' +
      'listing_type_id = 2', data
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1600.00, ' +
      'title = "title three", ' +
      'description = "description three", ' +
      'address = "address three", ' +
      //'thumb = ?, ' +
      'zipcode = 99903, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 5, ' +
      'listing_type_id = 3'
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1700.00, ' +
      'title = "title four", ' +
      'description = "description four", ' +
      'address = "address four", ' +
      //'thumb = ?, ' +
      'zipcode = 99904, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 4, ' +
      'listing_type_id = 2'
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 2000.00, ' +
      'title = "title five", ' +
      'description = "description five", ' +
      'address = "address five", ' +
      //'thumb = ?, ' +
      'zipcode = 99905, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 3, ' +
      'listing_type_id = 1'
      ))

    .then( rows => DATABASE.query( 'SELECT id, price, title, description, address FROM listings' ) )    
    .then( rows => res.send(rows) );

  });

module.exports = mysqlRouter;
