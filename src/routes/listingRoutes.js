var express = require('express');
var listingRoutes = express.Router();
const DATABASE = require('../model/database.js');

//Save filtering options here
const FILTER = {
  listingType : "",
  minPrice : "",
  maxPrice : "",
  distance : "",
  minBedrooms : "",
  maxBedrooms : "",
  minBathrooms : "",
  maxBathrooms : ""
};

// default listing/index.ejs landing page for site, Cory, Junwei, 4/1/19
listingRoutes.route('/')
    .get((req, res) => {

      DATABASE.query('SELECT id, title, description, price, address, thumb, num_bed, num_bath FROM listings')
      .then(([results, fields]) =>{
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
      // FILTER.listingType = req.body.listingType;
      FILTER.minPrice = req.body.minPrice;
      FILTER.maxPrice = req.body.maxPrice;
      // FILTER.distance = req.body.distance;
      FILTER.minBedrooms = req.body.minBedrooms;
      FILTER.maxBedrooms = req.body.maxBedrooms;
      FILTER.minBathrooms = req.body.minBathrooms;
      FILTER.maxBathrooms = req.body.maxBathrooms;

      //checking the values from filter
      //if both are empty OR (min > max), assign a large range
      if(FILTER.minPrice == "" && FILTER.maxPrice == "") {
        FILTER.minPrice = "0";
        FILTER.maxPrice = "10000";
      }
      if(FILTER.minBedrooms == "" && FILTER.maxBedrooms == "") {
        FILTER.minBedrooms = "0";
        FILTER.maxBedrooms = "10";
        //console.log("1");
      }
      if(FILTER.minBathrooms == "" && FILTER.maxBathrooms == "") {
        FILTER.minBathrooms = "0";
        FILTER.maxBathrooms = "10";
      }
      //if min value is empty, assign min to 0
      if(FILTER.minPrice == "" && FILTER.maxPrice != "") {
        FILTER.minPrice = "0";
      }
      if(FILTER.minBedrooms == "" && FILTER.maxBedrooms != "") {
        FILTER.minBedrooms = "0";
        //console.log("2");
      }
      if(FILTER.minBathrooms == "" && FILTER.maxBathrooms != "") {
        FILTER.minBathrooms = "0";
      }
      //if max value is empty, assign max to a large number
      if(FILTER.minPrice != "" && FILTER.maxPrice == "") {
        FILTER.maxPrice = "10000";
      }
      if(FILTER.minBedrooms != "" && FILTER.maxBedrooms == "") {
        FILTER.maxBedrooms = "10";
        //console.log("3");
      }
      if(FILTER.minBathrooms != "" && FILTER.maxBathrooms == "") {
        FILTER.maxBathrooms = "10";
      }
      console.log('min price:' + FILTER.minPrice);
      console.log('max price:' + FILTER.maxPrice);
      console.log('min bed:' + FILTER.minBedrooms);
      console.log('max bed:' + FILTER.maxBedrooms);
      console.log('min bath:' + FILTER.minBathrooms);
      console.log('max bath:' + FILTER.maxBathrooms);

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

      //search bar
        // DATABASE.query('SELECT id, title, price, address, description, thumb ' +
        // 'FROM listings ' +
        // 'WHERE title LIKE ? OR price LIKE ? OR address LIKE ? OR description LIKE ?'
        // , [req.body.keyword,req.body.keyword,req.body.keyword,req.body.keyword]).then(([results, fields]) =>{
        //   res.render('listing/index', {
        //     objectArrayFromDb : results,
        //     filter : FILTER 
        //   });  
        // });

      //filter
        DATABASE.query('SELECT id, title, price, address, description, thumb, num_bed, num_bath ' +
        'FROM listings ' +
        'WHERE (price >= ? AND price <= ?) AND (num_bed >= ? AND num_bed <= ?) AND (num_bath >= ? AND num_bath <= ?)'
        , [FILTER.minPrice, FILTER.maxPrice, FILTER.minBedrooms, FILTER.maxBedrooms, FILTER.minBathrooms, FILTER.maxBathrooms])
        .then(([results, fields]) =>{
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