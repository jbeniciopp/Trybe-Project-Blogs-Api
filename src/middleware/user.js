const { User, BlogPost } = require('../models');

const validarEmail = (email) => {
  // Expressão regular para validar um email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Teste se o email corresponde à expressão regular
  return regex.test(email);
};

const createUserVerification1 = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const emailValidation = validarEmail(email);

  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  } if (emailValidation === false) {
    return res
      .status(400)
      .json({ message: '"email" must be a valid email' });
  } if (password.length < 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  return next();
};

const createUserVerification2 = async (req, res, next) => {
  const { email } = req.body;

  const result = await User.findOne({ where: { email } });

  if (result) {
    return res
    .status(409)
    .json({ message: 'User already registered' });
  }

  return next();
};

const validateUserToUpdate = async (email, id) => {
  const user = await User.findOne({ where: { email } });
  const post = await BlogPost.findByPk(id);

  if (post.userId !== user.id) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
};

module.exports = {
  createUserVerification1,
  createUserVerification2,
  validateUserToUpdate,
};