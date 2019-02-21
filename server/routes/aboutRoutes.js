var express = require('express');
var aboutRouter = express.Router();

aboutRouter.route('/')
    .get((req, res) => {
        res.render("about/index");
    })

// TODO: Copy the block for your name.
// Use same convention (lower case, etc...)
aboutRouter.route('/soheil-ansari')
    .get((req, res) => {
        res.render("about/soheil");
    })
aboutRouter.route('/cory-lewis')
    .get((req, res) => {
        res.render("about/cory");
    })

module.exports = aboutRouter;