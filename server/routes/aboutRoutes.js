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
aboutRouter.route('/chintan-puri')
    .get((req, res) => {
        res.render("about/chintan");
    })   
aboutRouter.route('/xinyu-zou')
    .get((req, res) => {
        res.render("about/xinyu");
    })  
aboutRouter.route('/junwei-liang')
    .get((req, res) => {
        res.render("about/junwei");
    })    
aboutRouter.route('/poorva-rathi')
    .get((req, res) => {
        res.render("about/poorva");
    })  
aboutRouter.route('/david-dropping')
    .get((req, res) => {
        res.render("about/david");
    })  
module.exports = aboutRouter;