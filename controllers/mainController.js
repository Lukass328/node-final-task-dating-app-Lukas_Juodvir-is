/* eslint-disable max-len */

const bcrypt = require('bcrypt');

const FormSchema = require('../schemas/registerSchema');
const TopicsShema = require('../schemas/TopicsSchema');

module.exports = {
  register: async (req, res) => {
    const { username, passOne, image } = req.body;

    const userExists = await FormSchema.findOne({ username });
    if (userExists) return res.send({ error: true, message: 'User already exists', data: null });

    // REgister new user
    const hashedPassword = await bcrypt.hash(passOne, 10);

    const formToDb = new FormSchema({ username, passOne: hashedPassword, image });
    await formToDb.save();
    res.send({ error: false, message: null, data: formToDb });
  },
  login: async (req, res) => {
    const { username, passOne } = req.body;
    const userExists = await FormSchema.findOne({ username });
    if (userExists) {
      req.session.user = userExists.username;
      console.log('  req.session.user ===', req.session.user);
      if (await bcrypt.compare(passOne, userExists.passOne)) {
        return res.send({ error: false, message: null });
      }
      return res.send({ error: true, message: 'Bad credentials', data: null });
    }
    res.send({ error: true, message: 'Bad credentials', data: null });
  },
  logout: async (req, res) => {
    if (req.session.user) {
      delete req.session.user;
      res.json({ loggedIn: false, result: 'SUCCESS' });
    } else {
      res.json({ result: 'ERROR', message: 'User is not logged in.' });
    }
  },
  authSession: (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false, message: 'Please log in or register' });
    }
  },
  uploadPhoto: async (req, res) => {
    const { image, username } = req.body;

    const img = await FormSchema.findOneAndUpdate({ username }, { image });
    res.send({ error: false, message: 'Image uploaded successfuly', data: img });

  },
  getUser: async (req, res) => {


    const user = await FormSchema.find({ username: req.session.user });
    res.send({ error: false, message: 'Image uploaded successfuly', data: user });

  },
  getTopics: async (req, res) => {


    const topics = await TopicsShema.find();
    console.log('topics ===', topics);
    res.send({ error: false, message: 'Image uploaded successfuly', data: topics });

  },
  singleTopic: async (req, res) => {
    const { _id } = req.params;
    console.log('_id ===', _id);
    const singleTopic = await TopicsShema.findById(_id);
    console.log('singleTopic ===', singleTopic);
    res.send({ error: false, message: 'Topic get successfuly', data: singleTopic });

  },
  updateTopic: async (req, res) => {
    const { _id } = req.params;
    // const { title, question, username } = req.body;
    // console.log('id ===', _id);
    // console.log('title ===', title);
    // console.log('username ===', username);
    // console.log('question ===', question);
    // const updateTopic = await TopicsShema.findOneAndUpdate({ _id: _id }, { $push: { topics: { title, message: question, author: username } } });
    // console.log('updateTopic ===', updateTopic);
    // res.send({ error: false, message: 'Topics uploaded successfuly', data: updateTopic });

  },

};
