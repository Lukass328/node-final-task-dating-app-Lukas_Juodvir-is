const express = require('express');
const { login, register, authSession, logout, getUser, uploadPhoto } = require('../controllers/mainController');
const { validateRegistration } = require('../middleware/Validation');

const router = express.Router();


router.post('/register', validateRegistration, register);
router.post('/login', login);
router.post('/upload-photo', uploadPhoto);
router.get('/user', getUser);
router.get('/logout', logout);
router.get('/auth', authSession);




module.exports = router;