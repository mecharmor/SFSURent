var express = require('express');
var listingRoutes = express.Router();

// default listing/index.ejs landing page for site, Cory, Junwei, 4/1/19
listingRoutes.route('/')
    .get((req, res) => {
      DATABASE.query('SELECT id, title, description, price, address FROM listings', function (error, results, fields) {
       if (error) throw error;
       res.render('listing/index', {objectArrayFromDb : results});
      });
    
    })
    //search query based on title, price, address, description using % Like search
    .post((req, res) => {

      req.body.keyword = '%' + req.body.keyword + '%';
      let sql = 
      DATABASE.query('SELECT id, title, price, address, thumb ' +
      'FROM listings ' +
      'WHERE title LIKE ? OR price LIKE ? OR address LIKE ? OR description LIKE ?'
      , [req.body.keyword,req.body.keyword,req.body.keyword,req.body.keyword])
      .then( rows => {
        res.render('listing/index', {objectArrayFromDb : rows});      
      });  
    });

// load item page and pass listing data from id, (\\d+) one or more integers, Soheil, Poorva, 4/2/19
listingRoutes.route('/:id(\\d+)')
    .get((req, res) => {  
    DATABASE.query('SELECT * ' +
    'FROM listings ' +
    'WHERE id = ?', req.params.id)
    .then( rows => {
    res.render('listing/item', {objectArrayFromDb : rows});
  });    
 });

 // load listing index page given a listing_type for selected listing {ex| bungalow, apartment, house}, Soheil, Poorva,  4/2/19
listingRoutes.route('/:slug/')
    .get((req, res) => {  
      DATABASE.query('SELECT listings.id, listings.title, listings.price, listings.address ' +
      'FROM listings JOIN listing_type ON listings.listing_type_id = listing_type.id ' +
      'WHERE slug = ?', req.params.slug)
      .then( rows => {
        res.render('listing/index', {objectArrayFromDb : rows});      
      });     
    });

module.exports = listingRoutes;