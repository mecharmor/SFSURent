const bcrypt = require('bcryptjs');
const fs = require('fs');
const db = require('../model/database.js');

const saltRounds = 10;
/*
Author: Poorva / Soheil
Date: 3/22/19
Description: Async function to drop all the tables, crate tables,
Insert test data, and insert required initial data.
*/
const DropTables = async () => {
  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.query('DROP TABLE IF EXISTS favorite');
  await db.query('DROP TABLE IF EXISTS message');
  await db.query('DROP TABLE IF EXISTS listing_image');
  await db.query('DROP TABLE IF EXISTS listing_commute');
  await db.query('DROP TABLE IF EXISTS listing_feature');
  await db.query('DROP TABLE IF EXISTS features');
  await db.query('DROP TABLE IF EXISTS listing_type');
  await db.query('DROP TABLE IF EXISTS listings');
  await db.query('DROP TABLE IF EXISTS users');
  await db.query('SET FOREIGN_KEY_CHECKS = 1');
};


/*
  Author: Poorva / Soheil
  Date: 3/22/19
  Description: Async function to create all the tables.
  */
const CreateTables = async () => {
  await db.query('Create TABLE users ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'name VARCHAR(150) NOT NULL,'
    + 'email VARCHAR(500) NOT NULL,'
    + 'password VARCHAR(500) NOT NULL,'
    + 'phone BIGINT,'
    + 'thumb MEDIUMBLOB,'
    + 'isblocked TINYINT'
        + ')');

  await db.query('Create TABLE listing_type ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'slug VARCHAR(150) NOT NULL,'
    + 'name VARCHAR(150) NOT NULL'
      + ')');


  await db.query('CREATE TABLE listings ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'price double,'
    + 'title VARCHAR(150) NOT NULL,'
    + 'description VARCHAR(250),'
    + 'address VARCHAR(200),'
    + 'thumb MEDIUMBLOB,'
    + 'zipcode int,'
    + 'num_bed int,'
    + 'num_bath int,'
    + 'size int,'
    + 'score int,'
    + 'listing_type_id int NOT NULL,'
    + 'user_id INT NOT NULL,'
    + 'FOREIGN KEY (listing_type_id) REFERENCES listing_type(id),'
    + 'FOREIGN KEY (user_id) REFERENCES users(id)'
      + ')');


  await db.query('Create TABLE features ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'name VARCHAR(150) NOT NULL'
      + ')');


  await db.query('Create TABLE message ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'body VARCHAR(500) NOT NULL,'
    + 'user_id INT NOT NULL,'
    + 'listing_id INT NOT NULL,'
    + 'FOREIGN KEY (user_id) REFERENCES users(id),'
    + 'FOREIGN KEY (listing_id) REFERENCES listings(id)'
      + ')');


  await db.query('Create TABLE favorite ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'user_id int NOT NULL,'
    + 'listing_id int NOT NULL,'
    + 'FOREIGN KEY (user_id) REFERENCES users(id),'
    + 'FOREIGN KEY (listing_id) REFERENCES listings(id)'
      + ')');


  await db.query('Create TABLE listing_feature ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'feature_id int NOT NULL,'
    + 'listing_id int NOT NULL,'
    + 'FOREIGN KEY (feature_id) REFERENCES features(id),'
    + 'FOREIGN KEY (listing_id) REFERENCES listings(id)'
      + ')');


  await db.query('Create TABLE listing_commute ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'unit VARCHAR(150) NOT NULL,'
    + 'type VARCHAR(150) NOT NULL,'
    + 'value DOUBLE,'
    + 'listing_id int NOT NULL,'
    + 'FOREIGN KEY (listing_id) REFERENCES listings(id)'
      + ')');


  await db.query('Create TABLE listing_image ( '
    + 'id INT AUTO_INCREMENT PRIMARY KEY,'
    + 'title VARCHAR(150) NOT NULL,'
    + 'image MEDIUMBLOB,'
    + 'orders INT,'
    + 'image_value double,'
    + 'listing_id int NOT NULL,'
    + 'FOREIGN KEY (listing_id) REFERENCES listings(id)'
      + ')');
};


const DeleteAllData = async () => {
  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.query('DELETE FROM favorite');
  await db.query('DELETE FROM message');
  await db.query('DELETE FROM listing_image');
  await db.query('DELETE FROM listing_commute');
  await db.query('DELETE FROM listing_feature');
  await db.query('DELETE FROM features');
  await db.query('DELETE FROM listing_type');
  await db.query('DELETE FROM listings');
  await db.query('DELETE FROM users');
  await db.query('SET FOREIGN_KEY_CHECKS = 1');
};

const InsertListingTypes = async () => {
  await db.query('INSERT INTO listing_type SET id = 1, slug = "apartment", name = "Apartment"');
  await db.query('INSERT INTO listing_type SET id = 2, slug = "bungalow", name = "Bungalow"');
  await db.query('INSERT INTO listing_type SET id = 3, slug = "room", name = "Room"');
};

const InsertFeatures = async () => {
  await db.query('INSERT INTO features SET id = 1, name = "Safe and secure"');
  await db.query('INSERT INTO features SET id = 2, name = "Parking"');
  await db.query('INSERT INTO features SET id = 3, name = "Disability Access"');
  await db.query('INSERT INTO features SET id = 4, name = "Elevator"');
  await db.query('INSERT INTO features SET id = 5, name = "Fitness Center"');
  await db.query('INSERT INTO features SET id = 6, name = "Furnished"');
  await db.query('INSERT INTO features SET id = 7, name = "Wooden Flooring"');
  await db.query('INSERT INTO features SET id = 8, name = "Carpet Flooring"');
  await db.query('INSERT INTO features SET id = 9, name = "Fireplace"');
  await db.query('INSERT INTO features SET id = 10, name = "Air Contioned"');
  await db.query('INSERT INTO features SET id = 11, name = "Pet Friendly"');
  await db.query('INSERT INTO features SET id = 12, name = "Laundary on Site"');
  await db.query('INSERT INTO features SET id = 13, name = "Emergency Maintainence"');
};

const InsertTestUsers = async () => {
  await db.query('INSERT INTO users SET id = 1,'
  + 'name = "admin",'
  + 'email = "admin.1@gmail.com",'
  + 'password = ?,'
  + 'phone = 4130001234,'
  + 'isblocked = 0', bcrypt.hashSync('admin@123', saltRounds));

  await db.query('INSERT INTO users SET '
  + 'id = 2,'
  + 'name = "user1",'
  + 'email = "user.1@gmail.com",'
  + 'password = ?,'
  + 'phone = 4130005678,'
  + 'isblocked = 0', bcrypt.hashSync('user1@123', saltRounds));

  await db.query('INSERT INTO users SET '
  + 'id = 3,'
  + 'name = "user2",'
  + 'email = "user.2@gmail.com",'
  + 'password = ?,'
  + 'phone = 4131111234,'
  + 'isblocked = 0', bcrypt.hashSync('user2@123', saltRounds));

  await db.query('INSERT INTO users SET '
  + 'id = 4,'
  + 'name = "user3",'
  + 'email = "user.3@gmail.com",'
  + 'password = ?,'
  + 'phone = 4131111222,'
  + 'isblocked = 0', bcrypt.hashSync('user3@123', saltRounds));

  await db.query('INSERT INTO users SET '
  + 'id = 5,'
  + 'name = "user4",'
  + 'email = "user.4@gmail.com",'
  + 'password = ?,'
  + 'phone = 4131111244,'
  + 'isblocked = 0', bcrypt.hashSync('user4@123', saltRounds));

  await db.query('INSERT INTO users SET '
  + 'id = 6,'
  + 'name = "user5",'
  + 'email = "user.5@gmail.com",'
  + 'password = ?,'
  + 'phone = 4131111211,'
  + 'isblocked = 0', bcrypt.hashSync('user5@123', saltRounds));
};


const InsertTestListings = async () => {
  // temp code for faking uploading image
  const img1 = fs.readFileSync('./test_images/1.jpg');
  const img2 = fs.readFileSync('./test_images/2.jpg');
  const img3 = fs.readFileSync('./test_images/3.jpg');
  const img4 = fs.readFileSync('./test_images/4.jpg');
  const img5 = fs.readFileSync('./test_images/5.jpg');
  const img6 = fs.readFileSync('./test_images/6.jpg');
  const img7 = fs.readFileSync('./test_images/7.jpg');

  await db.query('INSERT INTO listings SET '
  + 'price = 1000.99, '
  + 'title = "title one", '
  + 'description = "description one", '
  + 'address = "address one", '
  + 'thumb = ?, '
  + 'zipcode = 99, '
  + 'num_bed = 2, '
  + 'num_bath = 2, '
  + 'size = 3, '
  + 'score = 5, '
  + 'user_id = 2,'
  + 'listing_type_id = 1', img1);


  await db.query('INSERT INTO listings SET '
  + 'price = 1999.99, '
  + 'title = "same title", '
  + 'description = "bungalow description", '
  + 'address = "address two", '
  + 'thumb = ?, '
  + 'zipcode = 99444, '
  + 'num_bed = 3, '
  + 'num_bath = 3, '
  + 'size = 3, '
  + 'score = 4, '
  + 'user_id = 3,'
  + 'listing_type_id = 2', img2);

  await db.query('INSERT INTO listings SET '
  + 'price = 1600.00, '
  + 'title = "title three", '
  + 'description = "description three", '
  + 'address = "address three", '
  + 'thumb = ?, '
  + 'zipcode = 99903, '
  + 'num_bed = 2, '
  + 'num_bath = 2, '
  + 'size = 3, '
  + 'score = 5, '
  + 'user_id = 4,'
  + 'listing_type_id = 1', img3);

  await db.query('INSERT INTO listings SET '
  + 'price = 1700.00, '
  + 'title = "title four", '
  + 'description = "description four", '
  + 'address = "address four", '
  + 'thumb = ?, '
  + 'zipcode = 99904, '
  + 'num_bed = 2, '
  + 'num_bath = 2, '
  + 'size = 3, '
  + 'score = 4, '
  + 'user_id = 5,'
  + 'listing_type_id = 2', img4);

  await db.query('INSERT INTO listings SET '
  + 'price = 2000.00, '
  + 'title = "title five", '
  + 'description = "description five", '
  + 'address = "address five", '
  + 'thumb = ?, '
  + 'zipcode = 99905, '
  + 'num_bed = 2, '
  + 'num_bath = 2, '
  + 'size = 3, '
  + 'score = 3, '
  + 'user_id = 2,'
  + 'listing_type_id = 1', img5);

  await db.query('INSERT INTO listings SET '
  + 'price = 1200.00, '
  + 'title = "title six", '
  + 'description = "description six", '
  + 'address = "address six", '
  + 'thumb = ?, '
  + 'zipcode = 94112, '
  + 'num_bed = 3, '
  + 'num_bath = 2, '
  + 'size = 2, '
  + 'score = 5, '
  + 'user_id = 6,'
  + 'listing_type_id = 2', img6);

  await db.query('INSERT INTO listings SET '
  + 'price = 1700.00, '
  + 'title = "title seven", '
  + 'description = "description seven", '
  + 'address = "address seven", '
  + 'thumb = ?, '
  + 'zipcode = 94132, '
  + 'num_bed = 2, '
  + 'num_bath = 2, '
  + 'size = 3, '
  + 'score = 3, '
  + 'user_id = 5,'
  + 'listing_type_id = 1', img7);
};

module.exports = {
  DropTables,
  CreateTables,
  DeleteAllData,
  InsertListingTypes,
  InsertFeatures,
  InsertTestUsers,
  InsertTestListings,
};
