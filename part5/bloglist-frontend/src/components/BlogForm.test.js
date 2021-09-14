import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const newBlog = {
    title: 'title for testing',
    author: 'me',
    url: 'https://fullstackopen.com/en/part5/testing_react_apps'
  }

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  Object.keys(newBlog).forEach((id) => {
    fireEvent.change(component.container.querySelector(`#${id}`), {
      target: { value: newBlog[id] },
    })
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
})