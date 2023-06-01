const express = require('express');

const { createUserVerification1, createUserVerification2 } = require('../middleware/user');
const { createUser, getAllUsers, getById } = require('../controllers/user');
const { tokenValidation } = require('../middleware/token');

const router = express.Router();

router.post(
  '/',
  createUserVerification1,
  createUserVerification2,
  createUser,
);

router.get(
  '/',
  tokenValidation,
  getAllUsers,
);

router.get(
  '/:id',
  tokenValidation,
  getById,
);

module.exports = router;