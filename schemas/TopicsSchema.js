const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicsShema = new Schema({
  forum: {
    type: String,
    required: true,

  },
  image: {
    type: String,
    required: true,

  },
  topics: [{ title: String, message: String, author: String }],

});

module.exports = mongoose.model('type12forumtopics', TopicsShema);
