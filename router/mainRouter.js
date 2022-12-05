const express = require('express');
const { login, register, authSession, logout, getUser, uploadPhoto, getTopics, updateTopic, singleTopic } = require('../controllers/mainController');
const { validateRegistration } = require('../middleware/Validation');

const router = express.Router();


router.post('/register', validateRegistration, register);
router.post('/login', login);
router.post('/upload-photo', uploadPhoto);
router.get('/user', getUser);
router.get('/topics', getTopics);
router.get('/logout', logout);
router.get('/auth', authSession);
router.post('/topics/:id', updateTopic);
router.get('/topics/:_id', singleTopic);



module.exports = router;