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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
