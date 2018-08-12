var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Highscore = require('./mongoose/Highscore');

// const SubmitHighscore = mongoose.model('SubmitHighscore', './mongoose/HighscoreSchema');

const authorisation = 'bueibwf&#@b830B*wnUW&!$9nce#'

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

router.use(function(req, res, next) {

    // Only letters and numbers in name
    console.log(req.body);
    
    // authoriztion
    if (req.headers.auth !== authorisation) {
        res.send({
                    success: false,
                    data: { 
                        error: 'You are not authorized to do that'
                    }
                })
        return
    }
    next(); 
    // continue doing what we were doing and go to the route
});


router.post('/submit', function(req, res) {
    console.log('-- SUBMITTED HIGHSCORE --');
    const name = req.body.name;
    const minerals = req.body.minerals;
    const floor = req.body.floor;
    Highscore.submit.create({name: name, minerals: minerals, floor: floor}, function(err, result){
        if (err) {
            console.log(err);
        };
        console.log(result);
    })
    // console.log(highscore);
    
    // Tank.create({ size: 'small' }, function (err, small) {
    //     if (err) return handleError(err);
    //     // saved!
    //   });
    res.send({success: true})
})

router.post('/death', function(req, res) {
    console.log('-- DEATH HIGHSCORE --');
    const name = req.body.name;
    const minerals = req.body.minerals;
    const floor = req.body.floor;
    var highscore = Highscore.death.create({ minerals: minerals, floor: floor, name: name}, function(err, res2){
        if (err) return err;
        console.log(res2);
    })
    res.send({success: true})
})


module.exports = router;