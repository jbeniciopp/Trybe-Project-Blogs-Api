const { Category } = require('../models');

const createCategory = (category) => {
  const { name } = category;

  return Category.create({ name });
};

const getAllCategories = () => Category.findAll();

const getCategoryId = async (id) => {
  const category = await Category.findOne({
    where: { id },
  });
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryId,
};