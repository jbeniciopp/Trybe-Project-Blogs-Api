const express = require('express');

const { loginVerification } = require('../middleware/login');
const { login } = require('../controllers/login');

const router = express.Router();

router.post(
  '/',
  loginVerification,
  login,
);

module.exports = router;