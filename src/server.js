// server.js
require("babel-polyfill");

// BASE SETUP
// ==============================================

const express = require('express');
const app     = express();
const port    =   process.env.PORT || 8080;
const bodyParser = require('body-parser')
var expressSanitizer = require('express-sanitizer');
var mongoose = require('mongoose');
const config = require('./config');

var env = process.env.NODE_ENV || 'development';
console.log(env);
const database = config[env].database
// console.log(database);


// DATABASE
// ==============================================

mongoose.connect(database, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( 'Connected to mongoose')
})

// ROUTES
// ==============================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());

// sample route with a route the way we're used to seeing it
app.get('/', function(req, res) {
    res.send('this is a sample!');
});

app.get('/sample', function(req, res) {
    res.send('this is a sample!');
});

// we'll create our routes here

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

const submitHighscore = require('./submitHighscore');
router.use('/submithighscore', submitHighscore);

const getHighscores = require('./getHighscores');
router.use('/gethighscores', getHighscores);

// const getHighscores = require('./getHighscores');
router.use('/test', function(req, res) {
    router.post('/', function(req, res) {
        console.log('== TEST ==');
        
        res.send({success: true});
    });
});

const clearHighscore = require('./clearScore');
router.use('/clearscores', clearHighscore);


// // home page route (http://localhost:8080)
// router.get('/', function(req, res) {
//     res.send('im the home page!');  
// });

// // about page route (http://localhost:8080/about)
// router.get('/about', function(req, res) {
//     res.send('im the about page!'); 
// });

// // route middleware to validate :name
// router.param('name', function(req, res, next, name) {
//     // do validation on name here
//     // blah blah validation
//     // log something so we know its working
//     console.log('doing name validations on ' + name);

//     // once validation is done save the new item in the req
//     req.name = name;
//     // go to the next thing
//     next(); 
// });

// // route with parameters (http://localhost:8080/hello/:name)
// router.get('/hello/:name', function(req, res) {
//     res.send('hello ' + req.name + '!');
// });

// apply the routes to our application
app.use('/', router);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);