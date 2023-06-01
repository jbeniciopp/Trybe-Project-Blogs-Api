const express = require('express');

const { tokenValidation } = require('../middleware/token');
const { validateCategory } = require('../middleware/category');
const {
  createPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
} = require('../controllers/post');
const { validatePostCategory } = require('../middleware/post');

const router = express.Router();

router.post(
  '/',
  tokenValidation,
  validateCategory,
  validatePostCategory,
  createPost,
);

router.get(
  '/',
  tokenValidation,
  getAllBlogPosts,
);

router.get(
  '/:id',
  tokenValidation,
  getBlogPostById,
);

router.put(
  '/:id',
  tokenValidation,
  updateBlogPost,
);

module.exports = router;