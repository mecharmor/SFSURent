var express = require('express');
var mysqlRouter = express.Router();
/* const mysql = require('mysql'); */
var https = require('https');
var fs = require('fs');

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
// var img1 = fs.readFileSync("./src/test_images/1.jpg");
// var img2 = fs.readFileSync("./src/test_images/2.jpg");
// var img3 = fs.readFileSync("./src/test_images/3.jpg");
// var img4 = fs.readFileSync("./src/test_images/4.jpg");
// var img5 = fs.readFileSync("./src/test_images/5.jpg");
// var img6 = fs.readFileSync("./src/test_images/6.jpg");
// var img7 = fs.readFileSync("./src/test_images/7.jpg");

var img1 = fs.readFileSync("./public/images/sample_apt.jpg");
var img2 = fs.readFileSync("./public/images/sample_apt.jpg");
var img3 = fs.readFileSync("./public/images/sample_apt.jpg");
var img4 = fs.readFileSync("./public/images/sample_apt.jpg");
var img5 = fs.readFileSync("./public/images/sample_apt.jpg");
var img6 = fs.readFileSync("./public/images/sample_apt.jpg");
var img7 = fs.readFileSync("./public/images/sample_apt.jpg");

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
      'title = "same title", ' +
      'description = "apartment description", ' +
      'address = "address one", ' +
      'thumb = ?, ' +
      'zipcode = 99, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 5, ' +
      'listing_type_id = 1', img1
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1999.99, ' +
      'title = "same title", ' +
      'description = "bungalow description", ' +
      'address = "address two", ' +
      'thumb = ?, ' +
      'zipcode = 99444, ' +
      'num_bed = 3, ' +
      'num_bath = 3, ' +
      'size = 3, ' +
      'score = 4, ' +
      'listing_type_id = 2', img2
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1600.00, ' +
      'title = "title three", ' +
      'description = "description three", ' +
      'address = "address three", ' +
      'thumb = ?, ' +
      'zipcode = 99903, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 5, ' +
      'listing_type_id = 1', img3
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1700.00, ' +
      'title = "title four", ' +
      'description = "description four", ' +
      'address = "address four", ' +
      'thumb = ?, ' +
      'zipcode = 99904, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 4, ' +
      'listing_type_id = 2', img4
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 2000.00, ' +
      'title = "title five", ' +
      'description = "description five", ' +
      'address = "address five", ' +
      'thumb = ?, ' +
      'zipcode = 99905, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 3, ' +
      'listing_type_id = 1', img5
      ))

      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1200.00, ' +
      'title = "title six", ' +
      'description = "description six", ' +
      'address = "address six", ' +
      'thumb = ?, ' +
      'zipcode = 94112, ' +
      'num_bed = 3, ' +
      'num_bath = 2, ' +
      'size = 2, ' +
      'score = 5, ' +
      'listing_type_id = 2', img6
      ))


      .then(DATABASE.query('INSERT INTO listings SET ' +
      'price = 1700.00, ' +
      'title = "title seven", ' +
      'description = "description seven", ' +
      'address = "address seven", ' +
      'thumb = ?, ' +
      'zipcode = 94132, ' +
      'num_bed = 2, ' +
      'num_bath = 2, ' +
      'size = 3, ' +
      'score = 3, ' +
      'listing_type_id = 1', img7
      ))

    .then( rows => DATABASE.query( 'SELECT id, price, title, description, address FROM listings' ) )    
    .then( rows => res.send(rows) );

  });

module.exports = mysqlRouter;
