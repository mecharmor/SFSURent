var express = require('express');
var mysqlRouter = express.Router();
const db = require('../model/database.js');
var https = require('https');
var fs = require('fs');


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

    //DROP TABLE IF EXISTS listings
       db.query('select 1')

       .then(db.query('DELETE FROM favorite'))
       .then(db.query('DELETE FROM message'))
       .then(db.query('DELETE FROM listing_image'))
       .then(db.query('DELETE FROM listing_commute'))
       .then(db.query('DELETE FROM listing_feature'))
       .then(db.query('DELETE FROM features'))
       .then(db.query('DELETE FROM listing_type'))
       .then(db.query('DELETE FROM listings'))
       .then(db.query('DELETE FROM users'))

      .then(db.query('DROP TABLE IF EXISTS favorite'))
      .then(db.query('DROP TABLE IF EXISTS message'))
      .then(db.query('DROP TABLE IF EXISTS listing_image'))
      .then(db.query('DROP TABLE IF EXISTS listing_commute'))
      .then(db.query('DROP TABLE IF EXISTS listing_feature'))
      .then(db.query('DROP TABLE IF EXISTS features'))
      .then(db.query('DROP TABLE IF EXISTS listing_type'))
      .then(db.query('DROP TABLE IF EXISTS listings'))
      .then(db.query('DROP TABLE IF EXISTS users'))

      .then( db.query('Create TABLE users ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'name VARCHAR(150) NOT NULL,' +
      'email VARCHAR(500) NOT NULL,' +
      'password VARCHAR(500) NOT NULL,' +
      'phone BIGINT,' +
      'thumb MEDIUMBLOB,' +
      'isblocked TINYINT' +
          ')'
      ))
      

      .then( db.query('Create TABLE listing_type ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'slug VARCHAR(150) NOT NULL,' +
      'name VARCHAR(150) NOT NULL' +
        ')'
      ))
      
      .then( db.query('CREATE TABLE listings ( ' + 
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
      'user_id INT NOT NULL,' +
      'FOREIGN KEY (listing_type_id) REFERENCES listing_type(id),'+ 
      'FOREIGN KEY (user_id) REFERENCES users(id)' +
        ')'
      ))

      

    

      .then( db.query('Create TABLE message ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'body VARCHAR(500) NOT NULL,' +
      'user_id INT NOT NULL,' +
      'listing_id INT NOT NULL,' +
      'FOREIGN KEY (user_id) REFERENCES users(id),' +
      'FOREIGN KEY (listing_id) REFERENCES listings(id)' +
        ')'
      ))

      .then( db.query('Create TABLE favorite ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'user_id int NOT NULL,' +
      'listing_id int NOT NULL,' +
      'FOREIGN KEY (user_id) REFERENCES users(id),'+
      'FOREIGN KEY (listing_id) REFERENCES listings(id)'+
        ')'
      ))

    

      .then( db.query('Create TABLE features ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'name VARCHAR(150) NOT NULL' +
        ')'
      ))

      .then( db.query('Create TABLE listing_feature ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'feature_id int NOT NULL,' +
      'listing_id int NOT NULL,' +
      'FOREIGN KEY (feature_id) REFERENCES features(id),'+
      'FOREIGN KEY (listing_id) REFERENCES listings(id)'+
        ')'
      ))

      .then( db.query('Create TABLE listing_commute ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'unit VARCHAR(150) NOT NULL,' +
      'type VARCHAR(150) NOT NULL,' +
      'value DOUBLE,' +
      'listing_id int NOT NULL,' +
      'FOREIGN KEY (listing_id) REFERENCES listings(id)'+
        ')'
      ))

      .then( db.query('Create TABLE listing_image ( ' + 
      'id INT AUTO_INCREMENT PRIMARY KEY,' +
      'title VARCHAR(150) NOT NULL,' +
      'image MEDIUMBLOB,' +
      'orders INT,' +
      'image_value double,' +
      'listing_id int NOT NULL,' +
      'FOREIGN KEY (listing_id) REFERENCES listings(id)'+
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

    db.query( 'DELETE FROM listing_feature' )
    .then(db.query( 'DELETE FROM features' ))
    .then(db.query( 'DELETE FROM listings' ))
    .then(db.query( 'DELETE FROM listing_type' ))
    .then(db.query( 'DELETE FROM users' ))



      .then(db.query('INSERT INTO listing_type SET id = 1, slug = "apartment", name = "Apartment"' ))
      .then(db.query('INSERT INTO listing_type SET id = 2, slug = "bungalow", name = "Bungalow"'))
      .then(db.query('INSERT INTO listing_type SET id = 3, slug = "room", name = "Room"'))

      .then(db.query('INSERT INTO users SET '+
      'id = 1,' +
      'name = "admin",'       +
      'email = "admin.1@gmail.com",' +
      'password = "admin@123",' +
      'phone = 4130001234,' +
      'isblocked = 0'))

      .then(db.query('INSERT INTO users SET '+
      'id = 2,' +
      'name = "user1",'       +
      'email = "user.1@gmail.com",' +
      'password = "user1@123",' +
      'phone = 4130005678,' +
      'isblocked = 0'))

      .then(db.query('INSERT INTO users SET '+
      'id = 3,' +
      'name = "user2",'       +
      'email = "user.2@gmail.com",' +
      'password = "user2@123",' +
      'phone = 4131111234,' +
      'isblocked = 0'))

      .then(db.query('INSERT INTO users SET '+
      'id = 4,' +
      'name = "user3",'       +
      'email = "user.3@gmail.com",' +
      'password = "user3@123",' +
      'phone = 4131111222,' +
      'isblocked = 0'))

      .then(db.query('INSERT INTO users SET '+
      'id = 5,' +
      'name = "user4",'       +
      'email = "user.4@gmail.com",' +
      'password = "user4@123",' +
      'phone = 4131111244,' +
      'isblocked = 0'))

      .then(db.query('INSERT INTO users SET '+
      'id = 6,' +
      'name = "user5",'       +
      'email = "user.5@gmail.com",' +
      'password = "user5@123",' +
      'phone = 4131111211,' +
      'isblocked = 0'))

        .then(db.query('INSERT INTO listings SET ' +
        'price = 1000.99, ' +
        'title = "title one", ' +
        'description = "description one", ' +
        'address = "address one", ' +
        'thumb = ?, ' +
        'zipcode = 99, ' +
        'num_bed = 2, ' +
        'num_bath = 2, ' +
        'size = 3, ' +
        'score = 5, ' +
        'user_id = 2,' +
        'listing_type_id = 1', img1
      ))

      .then(db.query('INSERT INTO listings SET ' +
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
      'user_id = 3,' +
      'listing_type_id = 2', img2
      ))

      .then(db.query('INSERT INTO listings SET ' +
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
      'user_id = 4,' +
      'listing_type_id = 1', img3
      ))

      .then(db.query('INSERT INTO listings SET ' +
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
      'user_id = 5,' +
      'listing_type_id = 2', img4
      ))

      .then(db.query('INSERT INTO listings SET ' +
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
      'user_id = 2,' +
      'listing_type_id = 1', img5
      ))

      .then(db.query('INSERT INTO listings SET ' +
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
      'user_id = 6,' +
      'listing_type_id = 2', img6
      ))


      .then(db.query('INSERT INTO listings SET ' +
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
      'user_id = 5,' +
      'listing_type_id = 1', img7
      ))

      .then(db.query('INSERT INTO features SET id = 1, name = "Safe and secure"' ))
      .then(db.query('INSERT INTO features SET id = 2, name = "Parking"' ))
      .then(db.query('INSERT INTO features SET id = 3, name = "Disability Access"' ))
      .then(db.query('INSERT INTO features SET id = 4, name = "Elevator"' ))
      .then(db.query('INSERT INTO features SET id = 5, name = "Fitness Center"' ))
      .then(db.query('INSERT INTO features SET id = 6, name = "Furnished"' ))
      .then(db.query('INSERT INTO features SET id = 7, name = "Wooden Flooring"' ))
      .then(db.query('INSERT INTO features SET id = 8, name = "Carpet Flooring"' ))
      .then(db.query('INSERT INTO features SET id = 9, name = "Fireplace"' ))
      .then(db.query('INSERT INTO features SET id = 10, name = "Air Contioned"' ))
      .then(db.query('INSERT INTO features SET id = 11, name = "Pet Friendly"' ))
      .then(db.query('INSERT INTO features SET id = 12, name = "Laundary on Site"' ))
      .then(db.query('INSERT INTO features SET id = 13, name = "Emergency Maintainence"' ))




    .then( rows => db.query( 'SELECT id, price, title, description, address FROM listings' ) )    
  
    .then( rows => res.send(rows) );

  });

module.exports = mysqlRouter;
