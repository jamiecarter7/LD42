var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var Highscore = require('./mongoose/Highscore');

// const SubmitHighscore = mongoose.model('SubmitHighscore', './mongoose/HighscoreSchema');

const authorisation = '8483qnf3&#@f3q9nF$@&!$9n#'

router.use(function(req, res, next) {

    // authorisation    
    if (req.headers.auth !== authorisation) {
        res.send({
                    success: false,
                    data: { 
                        error: 'You are not authorized to do that'
                    }
                })
        console.log('Unauthorised Request');
        return
    }
    // console.log('Authorised');

    next(); 
    // continue doing what we were doing and go to the route
});

router.post('/', async (req, res) => {
    mongoose.connection.collections['submithighscores'].drop( function(err) {
        console.log('=== Scores Cleared ===');
    });
    res.send({success: true});
    
    res.send(
        {
            success: true,
            data: reply
        })
        console.log('------ SUCCESS ------');
})

module.exports = router;