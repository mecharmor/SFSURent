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

      DATABASE.query('SELECT listings.id, listings.title, listings.description, listings.price, ' 
      + 'listings.address, listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
      + 'FROM listings, listing_commute '
      + 'WHERE listings.id = listing_commute.listing_id '
      + 'ORDER BY listings.id')
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

      console.log('listing type: ' + FILTER.listingType);

      //Update Filters
      //assign new req.body if req.body not undefined and FILTER != req.body
      if(typeof(req.body.listingType) != "undefined" && FILTER.listingType != req.body.listingType) {
        FILTER.listingType = req.body.listingType;
      }
      if(typeof(req.body.minPrice) != "undefined" && FILTER.minPrice != req.body.minPrice) {
        FILTER.minPrice = req.body.minPrice;
      }
      if(typeof(req.body.maxPrice) != "undefined" && FILTER.maxPrice != req.body.maxPrice) {
        FILTER.maxPrice = req.body.maxPrice;
      }
      if(typeof(req.body.distance) != "undefined" && FILTER.distance != req.body.distance) {
        FILTER.distance = req.body.distance;
      }
      if(typeof(req.body.minBedrooms) != "undefined" && FILTER.minBedrooms != req.body.minBedrooms) {
        FILTER.minBedrooms = req.body.minBedrooms;
      }
      if(typeof(req.body.maxBedrooms) != "undefined" && FILTER.maxBedrooms != req.body.maxBedrooms) {
        FILTER.maxBedrooms = req.body.maxBedrooms;
      }
      if(typeof(req.body.minBathrooms) != "undefined" && FILTER.minBathrooms != req.body.minBathrooms) {
        FILTER.minBathrooms = req.body.minBathrooms;
      }
      if(typeof(req.body.maxBathrooms) != "undefined" && FILTER.maxBathrooms != req.body.maxBathrooms) {
        FILTER.maxBathrooms = req.body.maxBathrooms;
      }
      // FILTER.minPrice = req.body.minPrice;
      // FILTER.maxPrice = req.body.maxPrice;
      // FILTER.distance = req.body.distance;
      // FILTER.minBedrooms = req.body.minBedrooms;
      // FILTER.maxBedrooms = req.body.maxBedrooms;
      // FILTER.minBathrooms = req.body.minBathrooms;
      // FILTER.maxBathrooms = req.body.maxBathrooms;
      
      console.log('listing type: ' + FILTER.listingType);
      console.log('min price:' + FILTER.minPrice);
      console.log('max price:' + FILTER.maxPrice);
      console.log('distance:' + FILTER.distance);
      console.log('min bed:' + FILTER.minBedrooms);
      console.log('max bed:' + FILTER.maxBedrooms);
      console.log('min bath:' + FILTER.minBathrooms);
      console.log('max bath:' + FILTER.maxBathrooms);

      //checking the values from filter
      //check if they are not numbers, assign to ""
      if(isNaN(FILTER.minPrice)) {
        FILTER.minPrice = "";
      }
      if(isNaN(FILTER.maxPrice)) {
        FILTER.maxPrice = "";
      }
      if(isNaN(FILTER.distance)) {
        FILTER.distance = "";
      }
      if(isNaN(FILTER.minBedrooms)) {
        FILTER.minBedrooms = "";
      }
      if(isNaN(FILTER.maxBedrooms)) {
        FILTER.maxBedrooms = "";
      }
      if(isNaN(FILTER.minBathrooms)) {
        FILTER.minBathrooms = "";
      }
      if(isNaN(FILTER.maxBathrooms)) {
        FILTER.maxBathrooms = "";
      }

      //if both are empty OR (min > max), assign a large range
      //if distance is empty, assign to a large number
      //note: number > "", so need FILTER.max != ""
      if((FILTER.minPrice == "" && FILTER.maxPrice == "") 
          || (FILTER.maxPrice != "" && FILTER.minPrice > FILTER.maxPrice)) {
        FILTER.minPrice = "0";
        FILTER.maxPrice = "10000";
      }
      if(FILTER.distance == "") {
        FILTER.distance = "1000";
      }
      if((FILTER.minBedrooms == "" && FILTER.maxBedrooms == "") 
          || (FILTER.maxBedrooms != "" && FILTER.minBedrooms > FILTER.maxBedrooms)) {  
        FILTER.minBedrooms = "0";
        FILTER.maxBedrooms = "10";
        //console.log("1");
      }
      if((FILTER.minBathrooms == "" && FILTER.maxBathrooms == "") 
          || (FILTER.maxBathrooms != "" && FILTER.minBathrooms > FILTER.maxBathrooms)) {
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

      //print the inputs to console
      console.log('min price:' + FILTER.minPrice);
      console.log('max price:' + FILTER.maxPrice);
      console.log('distance:' + FILTER.distance);
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

      //filter and search bar
      //if listing type is not "", such as apartment, rooms
      if(FILTER.listingType != "") {
        DATABASE.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
        + 'listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
        + 'FROM listings, listing_commute, listing_type '
        + 'WHERE (listing_type.id = listings.listing_type_id) AND (listings.id = listing_commute.listing_id) '
                + 'AND (listings.title LIKE ? OR listings.price LIKE ? OR listings.address LIKE ? OR listings.description LIKE ?) ' 
                + 'AND (listing_type.slug = ?) AND (listings.price >= ? AND listings.price <= ?) ' 
                + 'AND (listing_commute.value <= ?) AND (listings.num_bed >= ? AND listings.num_bed <= ?) ' 
                + 'AND (listings.num_bath >= ? AND listings.num_bath <= ?) '
        + 'ORDER BY listings.id'
        , [req.body.keyword, req.body.keyword, req.body.keyword, req.body.keyword, 
           FILTER.listingType, FILTER.minPrice, FILTER.maxPrice, FILTER.distance, FILTER.minBedrooms, 
           FILTER.maxBedrooms, FILTER.minBathrooms, FILTER.maxBathrooms])
        .then(([results, fields]) =>{
          res.render('listing/index', {
            objectArrayFromDb : results,
            filter : FILTER 
          });  
        });
      }
      //else, all the listings, all types
      else {
        DATABASE.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
        + 'listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
        + 'FROM listings, listing_commute '
        + 'WHERE (listings.id = listing_commute.listing_id) ' 
                + 'AND (listings.title LIKE ? OR listings.price LIKE ? OR listings.address LIKE ? OR listings.description LIKE ?) '
                + 'AND (listings.price >= ? AND listings.price <= ?) ' 
                + 'AND (listing_commute.value <= ?) AND (listings.num_bed >= ? AND listings.num_bed <= ?) ' 
                + 'AND (listings.num_bath >= ? AND listings.num_bath <= ?) '
        + 'ORDER BY listings.id'
        , [req.body.keyword, req.body.keyword, req.body.keyword, req.body.keyword,
           FILTER.minPrice, FILTER.maxPrice, FILTER.distance, FILTER.minBedrooms, 
           FILTER.maxBedrooms, FILTER.minBathrooms, FILTER.maxBathrooms])
        .then(([results, fields]) =>{
          res.render('listing/index', {
            objectArrayFromDb : results,
            filter : FILTER 
          });  
        });
      }
        // DATABASE.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
        // + 'listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
        // + 'FROM listings, listing_commute, listing_type '
        // + 'WHERE (listing_type.id = listings.listing_type_id) AND (listing_type.slug = ?) ' 
        //         + 'AND (listings.id = listing_commute.listing_id) AND (listings.price >= ? AND listings.price <= ?) ' 
        //         + 'AND (listing_commute.value <= ?) AND (listings.num_bed >= ? AND listings.num_bed <= ?) ' 
        //         + 'AND (listings.num_bath >= ? AND listings.num_bath <= ?) '
        // + 'ORDER BY listings.id'
        // , [FILTER.listingType, FILTER.minPrice, FILTER.maxPrice, FILTER.distance, FILTER.minBedrooms, 
        //    FILTER.maxBedrooms, FILTER.minBathrooms, FILTER.maxBathrooms])
        // .then(([results, fields]) =>{
        //   res.render('listing/index', {
        //     objectArrayFromDb : results,
        //     filter : FILTER 
        //   });  
        // });
      
        
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