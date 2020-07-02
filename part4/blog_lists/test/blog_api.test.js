const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

let token;
let userId;

beforeAll(async () => {
  await User.deleteMany({});

  const user = {
    username: 'davie504',
    name: 'David',
    password: '1234567',
  };
  let res = await api.post('/api/users').send(user);
  userId = res.body.id;
  res = await api.post('/api/login').send({
    username: user.username,
    password: user.password,
  });

  token = res.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...blog,
        user: userId,
      })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blog entries saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog should be returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`);

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain('React patterns');
  });

  test('a blog has a unique identifier property named id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`);

    const blog = response.body[0];

    expect(blog.id).toBeDefined();
  });
});

describe('addition of a new blog entry', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Are you (programming) in your comfort zone? Please don’t.',
      author: 'Aga Zaboklicka',
      url:
        'https://dev.to/agazaboklicka/are-you-programming-in-your-comfort-zone-please-dont-69i',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
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

  test('defaults the likes property to 0 if missing', async () => {
    const newBlog = {
      title: 'Are you (programming) in your comfort zone? Please don’t.',
      author: 'Aga Zaboklicka',
      url:
        'https://dev.to/agazaboklicka/are-you-programming-in-your-comfort-zone-please-dont-69i',
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((b) => b.likes);

    expect(likes).toContain(0);
  });

  test('fails with status code 400 if data invaild', async () => {
    const newBlog = {
      author: 'Aga Zaboklicka',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails withstatus code 401 Unauthorized if token is not provided', async () => {
    const newBlog = {
      title: 'Are you (programming) in your comfort zone? Please don’t.',
      author: 'Aga Zaboklicka',
      url:
        'https://dev.to/agazaboklicka/are-you-programming-in-your-comfort-zone-please-dont-69i',
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a specific blog', () => {
  test('succeeds with its properties correctly edited', async () => {
    const blogObjects = await helper.blogsInDb();
    const blogToUpdate = blogObjects[0];

    const blog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 100,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((b) => b.likes);

    expect(likes).toContain(100);
  });
});

describe('creation of a user', () => {
  test('fails with statuscode 400 if the user is invalid', async () => {
    const newUser = {
      name: 'Lucas',
      password: 'qwerty',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('fails with statuscode 400 and specific error message if invalid passord', async () => {
    const newUser = {
      username: 'lafi',
      name: 'Lucas',
      password: 'qw',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);

    expect(response.body.error).toBe(
      'the password must be at least 3 characters'
    );
  });

  test('fails with status code 400 if the user already exist', async () => {
    const newUser = {
      username: 'davie504',
      name: 'David',
      password: '1234567',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
