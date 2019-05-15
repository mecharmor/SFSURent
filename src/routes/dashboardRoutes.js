/*
Author: Soheil Ansari
Date: 4/27/19
Description: This file holds the routes for the user dashboard. The users can view their
listings and messages here.
*/
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Jimp = require('jimp');
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
    res.render('dashboard', { isLoggedIn: req.isAuthenticated() });
  });

dashboardRoutes.route('/listing')
  .get((req, res) => {
    console.log(req.user);
    res.render('create-post', { isLoggedIn: req.isAuthenticated() });
  });


async function makeThumb(path) {
  try {
    const buffer = await Jimp.read(path)
      .then(lenna => lenna
        .resize(300, Jimp.AUTO) // resize
        .quality(60) // set JPEG quality
        .getBufferAsync(Jimp.MIME_JPEG));
    return buffer;
  } catch (err) {
    // console.log(err);
    return 'err';
  }
}

async function makeImage(path) {
  try {
    const buffer = await Jimp.read(path)
      .then(lenna => lenna
        .resize(1000, Jimp.AUTO) // resize
        .quality(85) // set JPEG quality
        .getBufferAsync(Jimp.MIME_JPEG));
    return buffer;
  } catch (err) {
    // console.log(err);
    return 'err';
  }
}

dashboardRoutes.post('/listing', upload.single('thumb'), (req, res) => {
  // const img = fs.readFileSync(req.file.path);

  (async () => {
    let thumb;
    let image;

    if (req.file) {
      thumb = await makeThumb(req.file.path);
      image = await makeImage(req.file.path);
    }

    if (thumb === 'err' || image === 'err') {
      res.render('create-post', { isLoggedIn: req.isAuthenticated(), err: 'Error parsing image.' });
      return;
    }

    const insertRes = await db.query(`INSERT INTO listings (
      price, title, description, address,
      thumb, zipcode, num_bed, num_bath,
      size, listing_type_id, user_id
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?) `,
    [req.body.price, req.body.title, req.body.description, req.body.address,
      thumb, 0, req.body.num_bed, req.body.num_bath,
      req.body.size, req.body.listing_type_id, req.user.id]);

    await db.query(`INSERT INTO listing_image (
      title, image, orders, listing_id
      ) VALUES (?,?,?,?) `,
    ['', image, 0, insertRes[0].insertId]);

    res.redirect('/dashboard/?added=listing');
  })();
  // let encode_image = img.toString('base64');

  // let finalImg = {
  //   contentType: req.file.mimetype,
  //   image: new Buffer(encode_image, 'base64'),
  // };
});

dashboardRoutes.post('/listing/:id/message', (req, res) => {
  db.query('INSERT INTO message ( body, user_id, listing_id ) VALUES (?,?,?)',
    [req.body.messageBody, req.user.id, req.params.id])
    .then(() => {
      res.send({ status: true });
    });
});

module.exports = dashboardRoutes;
