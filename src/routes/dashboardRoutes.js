/*
Author: Soheil Ansari
Date: 4/27/19
Description: This file holds the routes for the user dashboard. The users can view their
listings and messages here.
*/
const express = require('express');
const db = require('../model/database.js');

const dashboardRoutes = express.Router();

dashboardRoutes.route('/')
  .get((req, res) => {
    console.log(req.user);
    res.render('dashboard');
  });

module.exports = dashboardRoutes;
