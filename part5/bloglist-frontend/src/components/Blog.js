import React, { useState } from "react";

const Blog = ({ blog, handleLikes }) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? "" : "none" };
  const label = visible ? "hide" : "show";
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const incLikes = () => {
    handleLikes(
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: ++blog.likes,
        user: blog.user.id,
      },
      blog.id
    );
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} <button onClick={toggleVisibility}>{label}</button>
      </span>
      <div className="details" style={show}>
        <span>{blog.url}</span> <br />
        <span>
          {blog.likes} <button onClick={incLikes}>like</button>
        </span>{" "}
        <br />
        <span>{blog.author}</span>
      </div>
    </div>
  );
};

export default Blog;
