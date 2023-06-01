const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = (user) => {
  const { displayName, email, password, image } = user;

  return User.create({ displayName, email, password, image });
};

const getAllUsers = () => User.findAll({
    attributes: { exclude: 'password' },
});

const getById = (id) => User.findOne({ 
  where: { id },
  attributes: { exclude: 'password' },
});

module.exports = {
  getByEmail,
  createUser,
  getAllUsers,
  getById,
};