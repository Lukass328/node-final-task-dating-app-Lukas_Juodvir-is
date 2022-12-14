module.exports = {
  // eslint-disable-next-line consistent-return
  validateRegistration: (req, res, next) => {
    const { username, passOne, passTwo, city, gender, age, photos } = req.body;

    if (username.length < 5 || username.length > 20) return res.send({ error: true, message: 'Username to long or to short', data: null });
    if (passOne !== passTwo) return res.send({ error: true, message: 'Passwords does not match', data: null });
    if (age < 18) return res.send({ error: true, message: 'Age must be 18 or higher', data: null });
    if (passOne.length < 5 || passOne.length > 20) return res.send({ error: true, message: 'Password length is to short', data: null });

    next();
  },

};
