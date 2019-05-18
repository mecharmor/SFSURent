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
const { validateCreatePost } = require('../validators/post.js');

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
    db.query('SELECT listings.id, listings.title, listings.description, listings.price, listings.distance_to_sfsu,'
      + 'listings.address, listings.thumb, listings.num_bed, listings.num_bath '
      + 'FROM listings '
      + 'WHERE user_id=? and status != "deleted" '
      + 'ORDER BY listings.id', req.user.id)
      .then(([listing_results,_]) => {
        
        db.query('SELECT listing_id, message.body, users.name '
          + 'FROM message ' 
          + 'JOIN users ON message.user_id = users.id '
          + 'WHERE listing_id IN (SELECT id FROM listings WHERE user_id = ?)', req.user.id)
            .then(([message_results,_]) => {
               console.log(message_results)
               res.render('dashboard', { 
               isLoggedIn: req.isAuthenticated(),
               body:message_results
             });
            });





      });

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

dashboardRoutes.post('/listing',[validateCreatePost() ,upload.single('thumb')], (req, res) => {
  // const img = fs.readFileSync(req.file.path);

  (async () => {
    const thumb = await makeThumb(req.file.path);
    const image = await makeImage(req.file.path);

    if (thumb === 'err' || image === 'err') {
      res.send('error on the images');
      return;
    }

    const insertRes = await db.query(`INSERT INTO listings (
      price, title, description, address,
      thumb, zipcode, num_bed, num_bath,
      size, listing_type_id, user_id
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?) `,
    [req.body.price, req.body.title, req.body.description, req.body.address,
      thumb, 0, req.body.num_bed, req.body.num_bath,
      req.body.size, req.body.listing_type_id, 1]);

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
