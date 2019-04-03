var express = require('express');
var listingRoutes = express.Router();

listingRoutes.route('/')
    .get((req, res) => {

      DATABASE.query('SELECT id, title, price, address FROM listings', function (error, results, fields) {
       if (error) throw error;
       // return results;
       res.render('listing/index', {something : results});
      });
    
    });

listingRoutes.route('/:id/')
    .get((req, res) => {
     //res.send(req.params.id)
      res.render("listing/item");
    });

module.exports = listingRoutes;