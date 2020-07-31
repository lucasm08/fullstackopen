import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm  /> calls createBlog with the right data', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'React patterns' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Michael Change' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://reactpatterns.com/' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'React patterns',
    author: 'Michael Change',
    url: 'https://reactpatterns.com/',
  })
})
