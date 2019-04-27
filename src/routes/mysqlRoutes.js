const express = require('express');

const mysqlRouter = express.Router();
const https = require('https');
const fs = require('fs');
const db = require('../model/database.js');
const init = require('../model/init-db.js');


// temp code for faking uploading image
// var img1 = fs.readFileSync("./src/test_images/1.jpg");
// var img2 = fs.readFileSync("./src/test_images/2.jpg");
// var img3 = fs.readFileSync("./src/test_images/3.jpg");
// var img4 = fs.readFileSync("./src/test_images/4.jpg");
// var img5 = fs.readFileSync("./src/test_images/5.jpg");
// var img6 = fs.readFileSync("./src/test_images/6.jpg");
// var img7 = fs.readFileSync("./src/test_images/7.jpg");

const img1 = fs.readFileSync('./public/images/sample_apt.jpg');
const img2 = fs.readFileSync('./public/images/sample_apt.jpg');
const img3 = fs.readFileSync('./public/images/sample_apt.jpg');
const img4 = fs.readFileSync('./public/images/sample_apt.jpg');
const img5 = fs.readFileSync('./public/images/sample_apt.jpg');
const img6 = fs.readFileSync('./public/images/sample_apt.jpg');
const img7 = fs.readFileSync('./public/images/sample_apt.jpg');

mysqlRouter.route('/refresh')
  .get((req, res) => {
    (async () => {
      await init.DropTables();
      await init.CreateTables();
      res.send('Refreshed database.');
    })();
  });

/*
Here we can insert some sample data in our listing table
*/
mysqlRouter.route('/insert')
  .get((req, res) => {
    (async () => {
      await init.DeleteAllData();
      await init.InsertListingTypes();
      await init.InsertFeatures();
      await init.InsertTestUsers();
      res.send('Inserted data into the database.');
    })();
  });

module.exports = mysqlRouter;
