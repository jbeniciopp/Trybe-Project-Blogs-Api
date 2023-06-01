const PostService = require('../services/postService');
const UserService = require('../services/userService');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = await UserService.getByEmail(req.payload.data);
    const post = await PostService.createPost({ 
      title, 
      content, 
      categoryIds, 
      userId: userId.id,
      updated: new Date(),
      published: new Date(),
    });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao cadastrar o post no banco de dados!',
      error: error.message,
    });
  }
};

const getAllBlogPosts = async (_req, res) => {
  try {
    const blogPosts = await PostService.getAllBlogPosts();

    return res.status(200).json(blogPosts);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao cadastrar o post no banco de dados!',
      error: error.message,
    });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await PostService.getBlogPostById(id);

    if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(blogPost);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao cadastrar o post no banco de dados!',
      error: error.message,
    });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const email = req.payload.data;
  
    const { title, content } = req.body;
  
    const { type, message } = await PostService.updateBlogPost(id, title, content, email);
  
    if (type === 'UNAUTHORIZED') return res.status(401).json({ message });
  
    if (type) return res.status(400).json({ message });
  
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao cadastrar o post no banco de dados!',
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};