const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})

  const blogs = testHelper.initialBlogs.map(blog => new Blog (blog))
  const saveBlogs = blogs.map(blog => blog.save())
  await Promise.all(saveBlogs)
}, 100000)

describe('when there is initially some blogs saved', () => {
  test('response is in JSON format', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      'React patterns'
    )
  })

  test('identifier property is named id not _id', async () => {
    const response = await testHelper.blogsInDb()
    response.forEach(blog => expect(blog.id).toBeDefined())
    response.forEach(blog => expect(blog._id).not.toBeDefined())
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await testHelper.blogsInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/blogs/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await testHelper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('transforming _id to id with toJSON', () => {
  test('unique identifier property is named id not _id', async () => {
    const response = await testHelper.blogsInDb()
    response.forEach(blog => expect(blog.id).toBeDefined())
    response.forEach(blog => expect(blog._id).not.toBeDefined())
  })
})

describe('verifying saved blogs', () => {
  test('a blog is succefully added to database', async () => {
    await api
      .post('/api/blogs')
      .send(testHelper.testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await testHelper.blogsInDb()
    blogs.forEach(blog => delete blog.id)
    expect(blogs).toContainEqual(testHelper.testBlog)
    expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
  })
  test('likes default to 0 if not provided', async () => {
    delete testHelper.testBlog.likes
    const response = await api
      .post('/api/blogs')
      .send(testHelper.testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
    expect(response.body.likes).toBeDefined()
  })

  test('missing url results in status code 400', async () => {
    delete testHelper.testBlog.url
    await api
      .post('/api/blogs')
      .send(testHelper.testBlog)
      .expect(400)
    const blogs = await testHelper.blogsInDb()
    expect(blogs).toHaveLength(testHelper.initialBlogs.length)
  })

  test('missing title results in status code 400', async () => {
    delete testHelper.testBlog.title
    await api
      .post('/api/blogs')
      .send(testHelper.testBlog)
      .expect(400)
    const blogs = await testHelper.blogsInDb()
    expect(blogs).toHaveLength(testHelper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('status code 204 if successfully deleted', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const deletedBlog = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .expect(204)

    const currentState = await testHelper.blogsInDb()
    expect(currentState).toHaveLength(testHelper.initialBlogs.length - 1)
    expect(currentState).not.toContainEqual(deletedBlog)
  })
})

describe('updating a specific blog', () => {
  test('updating with a valid id', async () => {
    const newLikes = { likes: 8 }
    const blogsAtStart = await testHelper.blogsInDb()
    const toBeUpdated = blogsAtStart[1]
    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send(newLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await testHelper.blogsInDb()
    const updatedBlog = result.find(blog => blog.id === toBeUpdated.id)

    expect(result).toHaveLength(testHelper.initialBlogs.length)
    expect(updatedBlog.likes).toBe(newLikes.likes)
  })

  test('updating with invalid id results in status code 400', async () => {
    const initialState = await testHelper.blogsInDb()
    const newLikes = { likes: 20 }
    await api
      .put('/api/blogs/12432kdkd')
      .send(newLikes)
      .expect(400)

    const currentState = await testHelper.blogsInDb()
    expect(currentState).toEqual(initialState)
  })
})
afterAll(() => mongoose.connection.close())