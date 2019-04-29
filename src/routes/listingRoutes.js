var express = require('express');
var listingRoutes = express.Router();
const db = require('../model/database.js');

//Save filtering options here
var FILTER = {
  listingType : "",
  keyword : "",
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

      db.query('SELECT listings.id, listings.title, listings.description, listings.price, ' 
      + 'listings.address, listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
      + 'FROM listings LEFT JOIN listing_commute '
      + 'ON listings.id = listing_commute.listing_id '
      + 'ORDER BY listings.id')
      .then(([results, fields]) =>{
       //if (error) throw error;
       res.render('listing/index', {
         objectArrayFromDb : results,
         FILTER : FILTER
        });
      });
    })
    //search query based on title, price, address, description using % Like search
    .post((req, res) => {

      //if search bar is clicked, change to new keyword
      if(typeof(req.body.listingType) != "undefined") {
        FILTER.keyword = req.body.keyword;
        //req.body.keyword = '';
      }
      //otherwise, keep the old keyword in search bar

      //Update Filters
      //assign new req.body if req.body not undefined and FILTER != req.body
      if(typeof(req.body.listingType) != "undefined" && FILTER.listingType != req.body.listingType) {
        FILTER.listingType = req.body.listingType;
      }
      console.log("keyword: " + FILTER.keyword);
      console.log("bed1: " + req.body.bed1);
      console.log("bed2: " + req.body.bed2);
      console.log("bed3: " + req.body.bed3);
      console.log("bed4: " + req.body.bed4);
      console.log("bed5: " + req.body.bed5);
      console.log("bath1: " + req.body.bath1);
      console.log("bath2: " + req.body.bath2);
      console.log("bath3: " + req.body.bath3);
      console.log("bath4: " + req.body.bath4);

      //bedroom check
      if(typeof(req.body.bed1) == "undefined") {
        req.body.bed1 = "0";
      }
      if(typeof(req.body.bed2) == "undefined") {
        req.body.bed2 = "0";
      }
      if(typeof(req.body.bed3) == "undefined") {
        req.body.bed3 = "0";
      }
      if(typeof(req.body.bed4) == "undefined") {
        req.body.bed4 = "0";
      }
      if(typeof(req.body.bed5) == "undefined") {
        req.body.bed5 = "20";
      }
      //if nothing in bedroom was checked, assign the range
      if(req.body.bed1 == '0' && req.body.bed2 == '0'
         && req.body.bed3 == '0' && req.body.bed4 == '0'
         && req.body.bed5 == '20') {
        FILTER.minBedrooms = 0;
        FILTER.maxBedrooms = 20;
      }
      else {   //else don't assign the range
        FILTER.minBedrooms = 0;
        FILTER.maxBedrooms = 0;
      }
      
      //bathroom check
      if(typeof(req.body.bath1) == "undefined") {
        req.body.bath1 = "0";
      }
      if(typeof(req.body.bath2) == "undefined") {
        req.body.bath2 = "0";
      }
      if(typeof(req.body.bath3) == "undefined") {
        req.body.bath3 = "0";
      }
      if(typeof(req.body.bath4) == "undefined") {
        req.body.bath4 = "20";
      }
      //if nothing in bathroom was checked, assign the range
      if(req.body.bath1 == '0' && req.body.bath2 == '0'
         && req.body.bath3 == '0' && req.body.bath4 == '20') {
        FILTER.minBathrooms = 0;
        FILTER.maxBathrooms = 20;
      }
      else {   //else don't assign the range
        FILTER.minBathrooms = 0;
        FILTER.maxBathrooms = 0;
      }

      /////////////////////////////
      // if(typeof(req.body.minPrice) != "undefined" && FILTER.minPrice != req.body.minPrice) {
      //   FILTER.minPrice = req.body.minPrice;
      // }
      // if(typeof(req.body.maxPrice) != "undefined" && FILTER.maxPrice != req.body.maxPrice) {
      //   FILTER.maxPrice = req.body.maxPrice;
      // }
      // if(typeof(req.body.distance) != "undefined" && FILTER.distance != req.body.distance) {
      //   FILTER.distance = req.body.distance;
      // }
      // if(typeof(req.body.minBedrooms) != "undefined" && FILTER.minBedrooms != req.body.minBedrooms) {
      //   FILTER.minBedrooms = req.body.minBedrooms;
      // }
      // if(typeof(req.body.maxBedrooms) != "undefined" && FILTER.maxBedrooms != req.body.maxBedrooms) {
      //   FILTER.maxBedrooms = req.body.maxBedrooms;
      // }
      // if(typeof(req.body.minBathrooms) != "undefined" && FILTER.minBathrooms != req.body.minBathrooms) {
      //   FILTER.minBathrooms = req.body.minBathrooms;
      // }
      // if(typeof(req.body.maxBathrooms) != "undefined" && FILTER.maxBathrooms != req.body.maxBathrooms) {
      //   FILTER.maxBathrooms = req.body.maxBathrooms;
      // }
      ////////////////////////////

      //checking the values from filter
      //check if they are not numbers, assign to ""

      //Check
      // for(let value of FILTER){
      //   if(isNaN(prpty)) {
      //     prpty = "";
      //   }
      // }

      /////////////////////////////
      // if(isNaN(FILTER.minPrice)) {
      //   FILTER.minPrice = "";
      // }
      // if(isNaN(FILTER.maxPrice)) {
      //   FILTER.maxPrice = "";
      // }
      // if(isNaN(FILTER.distance)) {
      //   FILTER.distance = "";
      // }
      // if(isNaN(FILTER.minBedrooms)) {
      //   FILTER.minBedrooms = "";
      // }
      // if(isNaN(FILTER.maxBedrooms)) {
      //   FILTER.maxBedrooms = "";
      // }
      // if(isNaN(FILTER.minBathrooms)) {
      //   FILTER.minBathrooms = "";
      // }
      // if(isNaN(FILTER.maxBathrooms)) {
      //   FILTER.maxBathrooms = "";
      // }
      /////////////////////////////

      //if both are empty OR (min > max), assign a large range
      //if distance is empty, assign to a large number
      //note: number > "", so need FILTER.max != ""
      ////////////////////////
      // if((FILTER.minPrice == "" && FILTER.maxPrice == "") 
      //     || (FILTER.maxPrice != "" && FILTER.minPrice > FILTER.maxPrice)) {
      //   FILTER.minPrice = "0";
      //   FILTER.maxPrice = "10000";
      // }
      // if(FILTER.distance == "") {
      //   FILTER.distance = "1000";
      // }
      // if((FILTER.minBedrooms == "" && FILTER.maxBedrooms == "") 
      //     || (FILTER.maxBedrooms != "" && FILTER.minBedrooms > FILTER.maxBedrooms)) {  
      //   FILTER.minBedrooms = "0";
      //   FILTER.maxBedrooms = "10";
      //   //console.log("1");
      // }
      // if((FILTER.minBathrooms == "" && FILTER.maxBathrooms == "") 
      //     || (FILTER.maxBathrooms != "" && FILTER.minBathrooms > FILTER.maxBathrooms)) {
      //   FILTER.minBathrooms = "0";
      //   FILTER.maxBathrooms = "10";
      // }
      // //if min value is empty, assign min to 0
      // if(FILTER.minPrice == "" && FILTER.maxPrice != "") {
      //   FILTER.minPrice = "0";
      // }
      // if(FILTER.minBedrooms == "" && FILTER.maxBedrooms != "") {
      //   FILTER.minBedrooms = "0";
      //   //console.log("2");
      // }
      // if(FILTER.minBathrooms == "" && FILTER.maxBathrooms != "") {
      //   FILTER.minBathrooms = "0";
      // }
      // //if max value is empty, assign max to a large number
      // if(FILTER.minPrice != "" && FILTER.maxPrice == "") {
      //   FILTER.maxPrice = "10000";
      // }
      // if(FILTER.minBedrooms != "" && FILTER.maxBedrooms == "") {
      //   FILTER.maxBedrooms = "10";
      //   //console.log("3");
      // }
      // if(FILTER.minBathrooms != "" && FILTER.maxBathrooms == "") {
      //   FILTER.maxBathrooms = "10";
      // }
      ///////////////////////////////

      //filter and search bar
      //if listing type is not "", such as apartment, rooms
      ////////////////////////////////
      // if(FILTER.listingType != "") {
      //   db.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
      //   + 'listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
      //   + 'FROM listings, listing_commute, listing_type '
      //   + 'WHERE (listing_type.id = listings.listing_type_id) AND (listings.id = listing_commute.listing_id) '
      //           + 'AND (listings.title LIKE ? OR listings.price LIKE ? OR listings.address LIKE ? OR listings.description LIKE ?) ' 
      //           + 'AND (listing_type.slug = ?) AND (listings.price >= ? AND listings.price <= ?) ' 
      //           + 'AND (listing_commute.value <= ?) AND (listings.num_bed >= ? AND listings.num_bed <= ?) ' 
      //           + 'AND (listings.num_bath >= ? AND listings.num_bath <= ?) '
      //   + 'ORDER BY listings.id'
      //   , [req.body.keyword, req.body.keyword, req.body.keyword, req.body.keyword, 
      //      FILTER.listingType, FILTER.minPrice, FILTER.maxPrice, FILTER.distance, FILTER.minBedrooms, 
      //      FILTER.maxBedrooms, FILTER.minBathrooms, FILTER.maxBathrooms])
      //   .then(([results, fields]) =>{
      //     res.render('listing/index', {
      //       objectArrayFromDb : results,
      //       FILTER : FILTER 
      //     });  
      //   });
      // }
      // //else, all the listings, all types
      // else {
      //   db.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
      //   + 'listings.thumb, listings.num_bed, listings.num_bath, listing_commute.value '
      //   + 'FROM listings, listing_commute '
      //   + 'WHERE (listings.id = listing_commute.listing_id) ' 
      //           + 'AND (listings.title LIKE ? OR listings.price LIKE ? OR listings.address LIKE ? OR listings.description LIKE ?) '
      //           + 'AND (listings.price >= ? AND listings.price <= ?) ' 
      //           + 'AND (listing_commute.value <= ?) AND (listings.num_bed >= ? AND listings.num_bed <= ?) ' 
      //           + 'AND (listings.num_bath >= ? AND listings.num_bath <= ?) '
      //   + 'ORDER BY listings.id'
      //   , [req.body.keyword, req.body.keyword, req.body.keyword, req.body.keyword,
      //      FILTER.minPrice, FILTER.maxPrice, FILTER.distance, FILTER.minBedrooms, 
      //      FILTER.maxBedrooms, FILTER.minBathrooms, FILTER.maxBathrooms])
      //   .then(([results, fields]) =>{
      //     res.render('listing/index', {
      //       objectArrayFromDb : results,
      //       FILTER : FILTER 
      //     });  
      //   });
      // }
      ////////////////////////////////
      console.log(FILTER.listingType);
      if(FILTER.listingType != "") {
        db.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
        + 'listings.thumb, listings.num_bed, listings.num_bath '
        + 'FROM listings, listing_type '
        + 'WHERE (listing_type.id = listings.listing_type_id) AND '
                 + '(listings.title LIKE ? OR listings.price LIKE ? OR listings.address LIKE ? OR listings.description LIKE ?) ' 
                 + 'AND (listing_type.slug = ?) AND (listings.num_bed = ? OR listings.num_bed = ? OR listings.num_bed = ? OR listings.num_bed = ? OR listings.num_bed >= ? OR (listings.num_bed >= ? AND listings.num_bed <= ?)) '
                 + 'AND (listings.num_bath = ? OR listings.num_bath = ? OR listings.num_bath = ? OR listings.num_bath >= ? OR (listings.num_bath >= ? AND listings.num_bath <= ?)) '
        + 'ORDER BY listings.id'
        , [('%' + FILTER.keyword + '%'), ('%' + FILTER.keyword + '%'), ('%' + FILTER.keyword + '%'), ('%' + FILTER.keyword + '%'), 
           FILTER.listingType, req.body.bed1, req.body.bed2, req.body.bed3, req.body.bed4, req.body.bed5, FILTER.minBedrooms, FILTER.maxBedrooms,
           req.body.bath1, req.body.bath2, req.body.bath3, req.body.bath4, FILTER.minBathrooms, FILTER.maxBathrooms])
        .then(([results, fields]) =>{
          res.render('listing/index', {
            objectArrayFromDb : results,
            FILTER : FILTER 
          });  
        });
      }
      else {
        db.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, ' 
        + 'listings.thumb, listings.num_bed, listings.num_bath '
        + 'FROM listings '
        + 'WHERE (listings.title LIKE ? OR listings.price LIKE ? OR listings.address LIKE ? OR listings.description LIKE ?) '
                 + 'AND (listings.num_bed = ? OR listings.num_bed = ? OR listings.num_bed = ? OR listings.num_bed = ? OR listings.num_bed >= ? OR (listings.num_bed >= ? AND listings.num_bed <= ?)) '
                 + 'AND (listings.num_bath = ? OR listings.num_bath = ? OR listings.num_bath = ? OR listings.num_bath >= ? OR (listings.num_bath >= ? AND listings.num_bath <= ?)) '
        + 'ORDER BY listings.id'
        , [('%' + FILTER.keyword + '%'), ('%' + FILTER.keyword + '%'), ('%' + FILTER.keyword + '%'), ('%' + FILTER.keyword + '%'),
           req.body.bed1, req.body.bed2, req.body.bed3, req.body.bed4, req.body.bed5, FILTER.minBedrooms, FILTER.maxBedrooms,
           req.body.bath1, req.body.bath2, req.body.bath3, req.body.bath4, FILTER.minBathrooms, FILTER.maxBathrooms])
        .then(([results, fields]) =>{
          res.render('listing/index', {
            objectArrayFromDb : results,
            FILTER : FILTER 
          });  
        });
      }
    });  //end of post

// load item page and pass listing data from id, (\\d+) one or more integers, Soheil, Poorva, 4/2/19
listingRoutes.route('/:id(\\d+)')
    .get((req, res) => {  
      db.query('SELECT * ' +
    'FROM listings ' +
    'WHERE id = ?', req.params.id).then(([results, fields])=>{
      res.render('listing/item', {objectArrayFromDb : results});
    });   
 });

 // load listing index page given a listing_type for selected listing {ex| bungalow, apartment, house}, Soheil, Poorva,  4/2/19
listingRoutes.route('/:slug/')
    .get((req, res) => {  
      db.query('SELECT listings.id, listings.title, listings.price, listings.address, listings.description, thumb ' +
      'FROM listings JOIN listing_type ON listings.listing_type_id = listing_type.id ' +
      'WHERE slug = ?', req.params.slug)
      .then( ([results, fields]) => {
        res.render('listing/index', {objectArrayFromDb : results});      
      });     
    })

module.exports = listingRoutes;