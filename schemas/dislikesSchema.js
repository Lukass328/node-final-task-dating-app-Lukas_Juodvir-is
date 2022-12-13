const mongoose = require('mongoose');

const { Schema } = mongoose;

const DislikesSchema = new Schema({
  userId: {

    type: String

  },
  dislikesUserId: { type: String },






});



module.exports = mongoose.model('datingDislikes', DislikesSchema);