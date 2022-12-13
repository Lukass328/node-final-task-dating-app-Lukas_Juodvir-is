/* eslint-disable max-len */

const bcrypt = require('bcrypt');

const FormSchema = require('../schemas/registerSchema');


module.exports = {
  register: async (req, res) => {
    const { username, passOne, city, gender, age, photos } = req.body;

    const userExists = await FormSchema.findOne({ username });
    if (userExists) return res.send({ error: true, message: 'User already exists', data: null });

    // Register new user
    const hashedPassword = await bcrypt.hash(passOne, 10);

    const formToDb = new FormSchema({ username, passOne: hashedPassword, city, gender, age, photos });
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
      req.session.destroy();
      res.json({ loggedIn: false, result: 'SUCCESS' });
    } else {
      res.json({ result: 'ERROR', message: 'Logged out.' });
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
    const { photos, username } = req.body;

    const img = await FormSchema.findOneAndUpdate({ username }, { $push: { photos } });
    res.send({ error: false, message: 'Image uploaded successfuly', data: img });

  },
  getUser: async (req, res) => {


    const user = await FormSchema.find({ username: req.session.user });
    res.send({ error: false, message: 'Image uploaded successfuly', data: user });

  },
  getUsers: async (req, res) => {


    const users = await TopicsShema.find();
    console.log('topics ===', topics);
    res.send({ error: false, message: 'Image uploaded successfuly', data: topics });

  },


};
