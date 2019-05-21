/*
Author: Cory Lewis
Date: 5/20/19
Description: This is a Middleware File that allows us to pass data to front end easily without needing to pass data duing a res.send() or res.render()
*/
const db = require('../model/database.js');

//listing_type table queried for all data pertaining to this
module.exports.passListingTypes = (req, res, next) => {
    db.query('SELECT * FROM listing_type').then(([results,_]) => {
        res.locals.LISTINGTYPES = results;
        next()
       });
}