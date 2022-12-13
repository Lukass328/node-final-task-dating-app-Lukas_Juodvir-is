const mongoose = require('mongoose');

const { Schema } = mongoose;

const FormSchema = new Schema({
  username: {
    type: String,
    required: true,

  },
  passOne: {
    type: String,
    required: true,

  },
  city: {
    type: String,
    required: true,

  },
  gender: {
    type: String,
    required: true,

  },
  age: {
    type: Number,
    required: true,

  },
  photos: [],

  likes: [{}],
  likedMe: [],

});
// 


module.exports = mongoose.model('DatingUsers', FormSchema);
