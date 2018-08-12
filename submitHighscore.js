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


router.post('/submit', async (req, res) => {
    console.log('-- SUBMITTED HIGHSCORE --');
    const name = req.body.name;
    const minerals = req.body.minerals;
    const floor = req.body.floor;
    var highscore = await Highscore.submit.create({name: name, minerals: minerals, floor: floor})
    console.log(highscore);
    
    // Tank.create({ size: 'small' }, function (err, small) {
    //     if (err) return handleError(err);
    //     // saved!
    //   });
    res.send(
        {
            success: true,
            data: {
                highscore: highscore.minerals,
                timestamp: highscore.date,
                name: highscore.name
            }
        })
})

router.post('/death', async (req, res) => {
    console.log('-- DEATH HIGHSCORE --');
    const name = req.body.name;
    const minerals = req.body.minerals;
    const floor = req.body.floor;
    var highscore = await Highscore.death.create({ minerals: minerals, floor: floor, name: name})
    console.log('-- HIGHSCORE --');
    console.log(highscore);
    
    res.send(
        {
            success: true,
            data: {
                highscore: highscore.minerals,
                timestamp: highscore.date,
                name: highscore.name
            }
        })
})


module.exports = router;