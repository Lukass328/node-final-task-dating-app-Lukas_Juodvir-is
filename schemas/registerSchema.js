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
  image: {
    type: String,
    required: true,

  },

});



module.exports = mongoose.model('type12ForumUsers', FormSchema);
