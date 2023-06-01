const { createToken } = require('../auth/authfunctions');
const { getByEmail } = require('../services/userService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = await getByEmail(email);

  if (!response || response.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = createToken(email);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};