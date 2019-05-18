const express = require('express');

const mysqlRouter = express.Router();
const https = require('https');
const db = require('../model/database.js');
const init = require('../model/init-db.js');

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
      await init.InsertTestListings();
      res.send('Inserted data into the database.');
    })();
  });
module.exports = mysqlRouter;
