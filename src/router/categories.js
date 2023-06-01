const express = require('express');

const { tokenValidation } = require('../middleware/token');
const { createCategory, getAllCategories } = require('../controllers/category');
const { createCategoryValidation } = require('../middleware/category');

const router = express.Router();

router.post(
  '/',
  tokenValidation,
  createCategoryValidation,
  createCategory,
);

router.get(
  '/',
  tokenValidation,
  getAllCategories,
);

module.exports = router;