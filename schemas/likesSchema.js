const mongoose = require('mongoose');

const { Schema } = mongoose;

const LikesSchema = new Schema({
  userId: {

    type: String

  },
  likesUserId: { type: String },






});



module.exports = mongoose.model('datingLikes', LikesSchema);