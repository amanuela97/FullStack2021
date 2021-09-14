import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {
  let component
  let likeMockHandler
  const blog = {
    title: 'title',
    author: 'test author',
    url: 'https://reactpatterns.com/',
    likes: 3,
    user: {
      username: 'testUsername',
      name: 'testName',
      id: '613f358a2eb5ecd3dcd64740'
    },
    id: '613f58df2eb5ecd3dcd64870'
  }

  beforeEach(() => {
    likeMockHandler = jest.fn()
    component = render(
      <Blog blog={blog} blogUpdate={likeMockHandler} loggedUser={blog.user}/>
    )
  })

  test('component renders only blog title and author by default', () => {
    expect(component.container).toHaveTextContent('view')
    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(component.container).not.toHaveTextContent(
      `${blog.url} ${blog.likes}`
    )
  })

  test('likes and url are shown when view button clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(button).toHaveTextContent('hide')
    expect(component.container).toHaveTextContent(
      `${blog.url}`
    )
    expect(component.container).toHaveTextContent(
      `${blog.likes}`
    )
  })

  test('clicking the like button calls event handler once', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})
