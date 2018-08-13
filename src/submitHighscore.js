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


router.post('/', async (req, res) => {
    console.log('-- SUBMITTED HIGHSCORE --');
    const name = req.body.name;
    let minerals = req.body.minerals;

    if (isNaN(req.body.minerals)) {
        minerals = parseInt(minerals)
    }
    let floor = req.body.floor;
    if (isNaN(req.body.minerals)) {
        floor = parseInt(floor)
    }
    var myscore = await Highscore.submit.create({name: name, minerals: minerals, floor: floor})
    // console.log(myscore);
    const highscores = await Highscore.submit.find({}, {'name': 1, 'minerals': 1, 'floor': 1, '_id': 0}, { limit:10, sort:{ minerals: -1, date: 1 }})
    // console.log(highscores);

    let myrank = await Highscore.submit.countDocuments({
        $or: [
            { minerals: { $gt: myscore.minerals} }, // Greater than or equal to
            { $and: [ { minerals: { $eq: myscore.minerals}} , { date: { $lt : myscore.date} } ] }	// Less than this time
        ]}).exec();
        // console.log(myrank);
    myrank += 1;    
    const reply = {
        myscore: {
            highscore: myscore.minerals,
            timestamp: myscore.date,
            name: myscore.name,
            floor: myscore.floor
        },
        highscores: highscores,
        myrank: myrank
    }
    console.log(reply);
    
    res.send(
        {
            success: true,
            data: reply
        })
        console.log('------ SUCCESS ------');
})

// // this is the text db now!!! DONT USE
// router.post('/death', async (req, res) => {
//     console.log('-- DEATH HIGHSCORE --');
//     const name = req.body.name;
//     const minerals = req.body.minerals;
//     const floor = req.body.floor;
//     var highscore = await Highscore.death.create({ minerals: minerals, floor: floor, name: name})
//     console.log('-- HIGHSCORE --');
//     console.log(highscore);
    
//     res.send(
//         {
//             success: true,
//             data: {
//                 highscore: highscore.minerals,
//                 timestamp: highscore.date,
//                 name: highscore.name
//             }
//         })
// })


module.exports = router;