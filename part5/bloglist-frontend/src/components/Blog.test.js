/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const handleLikes = jest.fn()
  const handleDeleteBlog = jest.fn()

  const blog = {
    title: 'React patterns',
    author: 'Michael Change',
    url: 'https://reactpatterns.com/',
    likes: 11,
    user: {
      username: 'Lucas',
      name: 'lucasm08',
      id: '5efd33236b8550fcb6364524',
    },
    id: '5efd33fd6b8550fcb6364525',
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleLikes={handleLikes}
        handleDeleteBlog={handleDeleteBlog}
      />
    )
  })

  test("only renders the blog's title", () => {
    const div = component.container.querySelector('.blog')
    const blogDetails = component.container.querySelector('.details')

    expect(div).toHaveTextContent('React patterns')
    expect(blogDetails).toHaveStyle('display: none')
  })
})
