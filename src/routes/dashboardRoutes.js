/*
Author: Soheil Ansari
Date: 4/27/19
Description: This file holds the routes for the user dashboard. The users can view their
listings and messages here.
*/
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const db = require('../model/database.js');


// Set storage for file uploads - Soheil 4/29/19
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

const dashboardRoutes = express.Router();

dashboardRoutes.route('/')
  .get((req, res) => {
    console.log(req.user);
    res.render('dashboard');
  });

dashboardRoutes.route('/listing')
  .get((req, res) => {
    console.log(req.user);
    res.render('create-post');
  });

dashboardRoutes.post('/listing', upload.single('thumb'), (req, res) => {
  const img = fs.readFileSync(req.file.path);
  // let encode_image = img.toString('base64');

  // let finalImg = {
  //   contentType: req.file.mimetype,
  //   image: new Buffer(encode_image, 'base64'),
  // };

  db.query(`INSERT INTO listings (
        price, title, description, address,
        thumb, zipcode, num_bed, num_bath,
        size, score, listing_type_id, user_id
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) `,
  [req.body.price, req.body.title, req.body.description, req.body.address,
    img, 0, req.body.num_bed, req.body.num_bath,
    req.body.size, 0, req.body.listing_type_id, 1])
    .then(() => {
      res.redirect('/dashboard/?added=listing');
    });
});

dashboardRoutes.post('/listing/:id/message', (req, res) => {
  db.query('INSERT INTO message ( body, user_id, listing_id ) VALUES (?,?,?)',
    [req.body.messageBody, req.user.id, req.params.id])
    .then(() => {
      res.send({ status: true });
    });
});

module.exports = dashboardRoutes;
