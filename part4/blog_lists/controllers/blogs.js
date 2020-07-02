const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  logger.info(blog);
  logger.info(request.user);

  if (blog.user.toString() === request.user.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }

  return response.status(401).json({ error: 'Unauthorized request' });
});

module.exports = blogsRouter;
