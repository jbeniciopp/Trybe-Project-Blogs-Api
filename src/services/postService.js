const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const { validateBlogPostUpdate } = require('../middleware/post');
const { validateUserToUpdate } = require('../middleware/user');

const getPostId = async (id) => {
  const category = await BlogPost.findAll({
    where: { id },
    include: [{ through: { attributes: [] }, attributes: { include: ['published', 'updated'] } }],
  });
  return category;
};

const createPost = async ({ title, content, categoryIds, userId, updated, published }) => {
  const result = await sequelize.transaction(async (t) => {
    const posts = await BlogPost.create({
      title, content, userId, updated, published,
    }, { transaction: t });
    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategory.create({ categoryId, postId: posts.id }, { transaction: t });
    }));
    return posts;
  });

  return result;
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: ['postId', 'categoryId'] } },
    ],
  });
  return blogPosts;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: ['postId', 'categoryId'] } },
    ],
  });
  return blogPost;
};

const updateBlogPost = async (id, title, content, email) => {
  const validate = await validateBlogPostUpdate(title, content);
  if (validate) return validate;

  const validateUser = await validateUserToUpdate(email, id);
  if (validateUser) return validateUser;

  await BlogPost.update({ title, content, updated: Date.now() }, { where: { id } });

  const updatedPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model:
        Category,
        as: 'categories',
        through: { attributes: [] },
        attributes: { exclude: ['PostCategory'] } },
    ],
  });

  return { type: null, message: updatedPost };
};

module.exports = {
  createPost,
  getPostId,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};