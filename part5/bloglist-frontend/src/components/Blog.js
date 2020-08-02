import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const show = { display: visible ? '' : 'none' }
  const label = visible ? 'hide' : 'show'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog)
  }

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
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <span>
        {blog.title} <button onClick={toggleVisibility}>{label}</button>
      </span>
      <div className="details" style={show}>
        <span>{blog.url}</span> <br />
        <span>
          <span className="likes-value">{blog.likes}</span>{' '}
          <button onClick={incLikes}>like</button>
        </span>{' '}
        <br />
        <span>{blog.author}</span> <br />
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}

export default Blog
