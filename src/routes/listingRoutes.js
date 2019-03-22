var express = require('express');
var listingRoutes = express.Router();

listingRoutes.route('/')
    .get((req, res) => {
        res.render("listing/index");
    });


listingRoutes.route('/:listingId/')
    .get((req, res) => {
      // res.send(req.params.listingId)
      res.render("listing/item");
    });



module.exports = listingRoutes;