import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="">
          title:
          <input
            id="title"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </label>{' '}
        <br />
        <label htmlFor="">
          author:
          <input
            id="author"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          url:
          <input
            id="url"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.prototype = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
