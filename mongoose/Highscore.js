var mongoose = require('mongoose');
// const cardComparison = require('./CardComparison'); // for Users.action in this page

const HighscoreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Player name not specified'],
    },
    minerals: {
      type: Number,
      default: 0,
      required: [true, 'Minerals score not specified']
    },
    floor: {
      type: Number,
      default: 1,
      required: [true, 'Floor number not specified']
    },
    date: {
      type: Date,
      default: Date.now,
    }
});
// mongoose.model('Card', CardSchema);
module.exports.submit = mongoose.model('SubmitHighscores', HighscoreSchema);
module.exports.death = mongoose.model('DeathHighscore', HighscoreSchema);