var express = require('express');
var listingRoutes = express.Router();
const DATABASE = require('../model/database.js');

//Save filtering options here
const FILTER = {
  listingType : ""
};

// default listing/index.ejs landing page for site, Cory, Junwei, 4/1/19
listingRoutes.route('/')
    .get((req, res) => {

      DATABASE.query('SELECT id, title, description, price, address, thumb FROM listings').then(([results, fields]) =>{
       //if (error) throw error;
       res.render('listing/index', {
         objectArrayFromDb : results
        });
      });
    })
    // DATABASE.query('SELECT id, title, description, price, address, thumb FROM listings', function(error, results, files){
    //   //if (error) throw error;
    //   res.render('listing/index', {
    //     objectArrayFromDb : results
    //    });
    //  });
   //})
    //search query based on title, price, address, description using % Like search
    .post((req, res) => {

      req.body.keyword = '%' + req.body.keyword + '%';
      //Update Filters
      FILTER.listingType = req.body.listingType;

      // if(req.body.listing_type_selection != ""){
      //   //Get id of housing type
      //   DATABASE.query('SELECT id FROM listing_type WHERE slug = ?', [req.body.listing_type_selection]).then(row => {
      //   //Query all records where the housing type matches the selection
      //   let sql = 
      //   DATABASE.query('SELECT id, title, price, address, description, thumb ' +
      //   'FROM listings ' +
      //   'WHERE listing_type_id = ? AND (title LIKE ? OR price LIKE ? OR address LIKE ? OR description LIKE ?)'
      //   , [row[0].id, req.body.keyword,req.body.keyword,req.body.keyword,req.body.keyword])
      //   .then( rows => {
      //     res.render('listing/index', {
      //       objectArrayFromDb : rows, 
      //     });      
      //   });  
      //     });
      // }else{

        DATABASE.query('SELECT id, title, price, address, description, thumb ' +
        'FROM listings ' +
        'WHERE title LIKE ? OR price LIKE ? OR address LIKE ? OR description LIKE ?'
        , [req.body.keyword,req.body.keyword,req.body.keyword,req.body.keyword]).then(([results, fields]) =>{
          res.render('listing/index', {
            objectArrayFromDb : results,
            filter : FILTER 
          });  
        });
      
        
      //   let results = (async (req) => {return await DATABASE.query('SELECT id, title, price, address, description, thumb ' +
      //   'FROM listings ' +
      //   'WHERE title LIKE ? OR price LIKE ? OR address LIKE ? OR description LIKE ?'
      //   , [req.body.keyword,req.body.keyword,req.body.keyword,req.body.keyword]);
      // });       
      //}
    });

// load item page and pass listing data from id, (\\d+) one or more integers, Soheil, Poorva, 4/2/19
listingRoutes.route('/:id(\\d+)')
    .get((req, res) => {  
      DATABASE.query('SELECT * ' +
    'FROM listings ' +
    'WHERE id = ?', req.params.id).then(([results, fields])=>{
      res.render('listing/item', {objectArrayFromDb : results});
    });   
 });

 // load listing index page given a listing_type for selected listing {ex| bungalow, apartment, house}, Soheil, Poorva,  4/2/19
listingRoutes.route('/:slug/')
    .get((req, res) => {  
      DATABASE.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, thumb ' +
      'FROM listings JOIN listing_type ON listings.listing_type_id = listing_type.id ' +
      'WHERE slug = ?', req.params.slug)
      .then( ([results, fields]) => {
        res.render('listing/index', {objectArrayFromDb : results});      
      });     
    })

module.exports = listingRoutes;