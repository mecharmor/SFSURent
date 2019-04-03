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

listingRoutes.route('/:id(\\d+)')
    .get((req, res) => {
     //res.send(req.params.id)
      res.render("listing/item");
    });

listingRoutes.route('/:slug/')
    .get((req, res) => {  
      
      console.log("getting data");


      DATABASE.query('SELECT listings.id, listings.title, listings.price, listings.address ' +
      'FROM listings JOIN listing_type ON listings.listing_type_id = listing_type.id ' +
      'WHERE slug = ?', req.params.slug)
      .then( rows => {
      
        
        console.log("got data");
        //if (error) throw error;
        // return res'ults;
        res.render('listing/index', {something : rows});
        
      });    


      
    });


module.exports = listingRoutes;