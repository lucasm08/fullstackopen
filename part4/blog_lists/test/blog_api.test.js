const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blogs');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are 2 blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('the first blog title is React patterns', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);

  expect(titles).toContain('React patterns');
});

test('a blog post has a unique identifier property named id', async () => {
  const response = await api.get('/api/blogs');

  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

test('a valid blog entry can be added', async () => {
  const newBlog = {
    title: 'Are you (programming) in your comfort zone? Please don’t.',
    author: 'Aga Zaboklicka',
    url:
      'https://dev.to/agazaboklicka/are-you-programming-in-your-comfort-zone-please-dont-69i',
    likes: 7,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain(
    'Are you (programming) in your comfort zone? Please don’t.'
  );
});

test('default the likes property to 0 if missing', async () => {
  const newBlog = {
    title: 'Are you (programming) in your comfort zone? Please don’t.',
    author: 'Aga Zaboklicka',
    url:
      'https://dev.to/agazaboklicka/are-you-programming-in-your-comfort-zone-please-dont-69i',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd.map((b) => b.likes);

  expect(likes).toContain(0);
});

test('the title and url are required', async () => {
  const newBlog = {
    author: 'Aga Zaboklicka',
    likes: 7,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
