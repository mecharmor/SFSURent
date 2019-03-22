var express = require('express');
var listingRoutes = express.Router();

listingRoutes.route('/')
    .get((req, res) => {
        res.render("listing/index");
    });

module.exports = listingRoutes;