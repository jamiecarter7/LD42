var express = require('express');
var router = express.Router();

var Highscore = require('./mongoose/Highscore');

const authorisation = '38gq9G3b83f9BF3&^@(@f9f2!933'

router.use(function(req, res, next) {

    // Authorisation
    if (req.headers.auth !== authorisation) {
        res.send({
                    success: false,
                    data: { 
                        error: 'You are not authorized to do that'
                    }
                })
        console.log('Unauthorized Request'); 
        return
    }
    next();

});

router.post('/', async (req, res) => {
    // console.log('-- SAVED HIGHSCORE --');
    // Highscore.submit.find({}, {'name': 1, 'minerals': 1, 'floor': 1, '_id': 0}, { limit:10, sort:{ minerals: -1, date: 1 }}, function(err, highscores){
    //     console.log('SUBMIT HIGHSCORES:');
        
    //     console.log(highscores);
    // })
    const highscore1 = await Highscore.death.find({}, {'name': 1, 'minerals': 1, 'floor': 1, '_id': 0}, { limit:10, sort:{ minerals: -1, date: 1 }})
    console.log(highscore1);
    
    // const myscore = req.body.myscore;
    // const myname = req.body.myname;
    // console.log(myname, myscore);

    // const highscoredetails = await Highscore.submit.findOne({ name: myname, minerals: myscore });
    // console.log(highscoredetails);
    
    // const time = highscoredetails.date;
    // console.log(time);

    // Highscore.submit.countDocuments(
    //     {
    //     $or: [
    //         { minerals: { $gt: myscore} }, // Greater than or equal to
    //         { $and: [ { minerals: { $eq: myscore}} , { date: { $lt : time} } ] }	// Less than this time
    //     ]
    // }
    // , function(err, result){
    //         if(err) {
    //             console.log(err);
    //         } 
            
    //         console.log('MY POSITION:');
            
    //         console.log(result);
    //     })
    res.send({success: true, data: highscore1})
})


// db.collection('highscores').count({
//     $or: [
//         { score: { $gt: currentHighscore} }, // Greater than or equal to
//         { $and: [ { score: { $eq: currentHighscore}} , { time: { $lt: time} } ] }	// Less than this time
//     ]},
//      function(err, result){
//         if(err)
//         {
//             console.log("Highscores: Failed to find rank - " + err);
//             res.send({error:"Internal Server Error"});
//             return;
//         }
//         var rank = result + 1;
//         console.log(`Highscores: ${uuid} - ${name} is ranked ${rank}`);
//         res.send({success: true, data: { scores: scores, rank: rank } });
//         return;
// });

// router.get('/death', function(req, res) {
//     console.log('-- DEATH HIGHSCORE --');
//     res.send({success: true})
// })


module.exports = router;