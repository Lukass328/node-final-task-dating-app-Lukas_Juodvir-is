const mongoose = require('mongoose');

const { Schema } = mongoose;

const MatchesSchema = new Schema({
  userId1: {

    type: String

  },
  userId2: { type: String },






});



module.exports = mongoose.model('datingMatches', MatchesSchema);