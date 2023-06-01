const createCategoryValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  return next();
};

const CategoryService = require('../services/categoryService');

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Promise.all(
    categoryIds.map(async (categoryId) => CategoryService.getCategoryId(categoryId)),
  );

  if (categories.some((category) => category === null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  } 

  return next();
};

module.exports = {
  createCategoryValidation,
  validateCategory,
};