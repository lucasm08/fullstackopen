const lodash = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let favorite = {};
  let maxLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      favorite = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes,
      };
    }
  }
  return favorite;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return {};
  }
  const blogByAuthors = lodash.chain(blogs).countBy('author').value();
  console.log();
  const authorWithMostBlogs = Object.keys(blogByAuthors).reduce((a, b) =>
    blogByAuthors[a] > blogByAuthors[b] ? a : b
  );
  return {
    author: authorWithMostBlogs,
    blogs: blogByAuthors[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return {};
  }
  const blogByAuthors = lodash.chain(blogs).groupBy('author').value();

  console.log;
  for (const [key, value] of Object.entries(blogByAuthors)) {
    blogByAuthors[key] = value.reduce((total, blog) => total + blog.likes, 0);
  }
  const authorWithMostLikes = Object.keys(blogByAuthors).reduce((a, b) =>
    blogByAuthors[a] > blogByAuthors[b] ? a : b
  );

  return {
    author: authorWithMostLikes,
    likes: blogByAuthors[authorWithMostLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
