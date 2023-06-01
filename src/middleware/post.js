const { Category } = require('../models');

const validatePostCategory = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const message = 'Some required fields are missing';

  if (!title) {
    return res.status(400).json({ message });
  }

  if (!content) {
    return res.status(400).json({ message });
  }

  if (!categoryIds) {
    return res.status(400).json({ message });
  }

  return next();
};

const validateTitle = (title) => {
  if (!title) {
    return { type: 'ERROR_TITLE', message: '"title" is required' };
  }
  return null;
};

const validateContent = (content) => {
  if (!content) {
    return { type: 'ERROR_CONTENT', message: '"content" is required' };
  }
  return null;
};

const validateBlogPostUpdate = (title, content) => {
  const validateTitleResult = validateTitle(title);
  const validateContentResult = validateContent(content);
  if (validateTitleResult || validateContentResult) {
    return { type: 'ERROR_UPDATE', message: 'Some required fields are missing' };
  }
  return null;
};

const validateCategories = async (categoryIds) => {
  const categories = await Category.findAll();
  if (!categoryIds || !Array.isArray(categoryIds)) {
    return { type: 'ERROR_CATEGORY', message: 'The "categoryIds" field must be an array' };
  }
  const existingCategoryIds = categories.map((category) => category.dataValues.id);
  const invalidCategoryIds = categoryIds
  .filter((categoryId) => !existingCategoryIds.includes(categoryId));
  if (invalidCategoryIds.length > 0) {
    return { type: 'ERROR_CATEGORY_NOT_FOUND', message: 'one or more "categoryIds" not found' };
  }
  if (categoryIds.length === 0) {
 return {
    type: 'ERROR_CATEGORY',
    message: 'Some required fields are missing',
   };
}
  return null;
};

const validateBlogPost = (title, content, categoryIds) => {
  const validateCategoriesResult = validateCategories(categoryIds);
  const validateTitleResult = validateTitle(title);
  const validateContentResult = validateContent(content);
  if (validateCategoriesResult) return validateCategoriesResult;
  if (validateTitleResult) return validateTitleResult;
  if (validateContentResult) return validateContentResult;
  return null;
};

module.exports = {
  validatePostCategory,
  validateBlogPostUpdate,
  validateBlogPost,
};