const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)
let token

beforeEach( async () => {
  await Blog.deleteMany({})

  const blogs = testHelper.initialBlogs.map(blog => new Blog (blog))
  const saveBlogs = blogs.map(blog => blog.save())
  await Promise.all(saveBlogs)

  // add user for authorization test
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('tests', 10)
  const user = new User({ username: 'test', name: 'test', passwordHash })
  await user.save()
  const res = await api
    .post('/api/login')
    .send({ username: 'test', name: 'test', password: 'tests' })
  token = res.body.token
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

describe('viewing a specific blog', () => {
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
  test('a blog is succefully added to database if authorized', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testHelper.testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await testHelper.blogsInDb()
    const blogsTitle = blogs.map( b => b.title)
    expect(blogsTitle).toContain(testHelper.testBlog.title)
    expect(blogs).toHaveLength(testHelper.initialBlogs.length + 1)
  })

  test('a blog added to database by unauthorized user fails', async () => {
    const res = await api
      .post('/api/blogs')
      .send(testHelper.testBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogs = await testHelper.blogsInDb()
    blogs.forEach(blog => delete blog.id)
    const blogsTitle = blogs.map( b => b.title)
    expect(blogs).toHaveLength(testHelper.initialBlogs.length)
    expect(res.body.error).toContain('invalid token')
    expect(blogsTitle).not.toContain(testHelper.testBlog.title)
  })

  test('likes default to 0 if not provided', async () => {
    delete testHelper.testBlog.likes
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(testHelper.testBlog)
      .expect(400)
    const blogs = await testHelper.blogsInDb()
    expect(blogs).toHaveLength(testHelper.initialBlogs.length)
  })

  test('missing title results in status code 400', async () => {
    delete testHelper.testBlog.title
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testHelper.testBlog)
      .expect(400)
    const blogs = await testHelper.blogsInDb()
    expect(blogs).toHaveLength(testHelper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('deletion succeeds with status code 204 if authorized', async () => {
    const testB = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testHelper.blogToBeDeleted)
      .expect(201)

    const currentState = await testHelper.blogsInDb()

    await api
      .delete(`/api/blogs/${testB.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const finalState = await testHelper.blogsInDb()
    const blogTitles = finalState.map(b => b.title)
    expect(finalState).toHaveLength(currentState.length - 1)
    expect(blogTitles).not.toContain(testB.body.title)
  })
  test('deletion fails with status code 401 if unauthorized', async () => {
    const testB = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testHelper.blogToBeDeleted)
      .expect(201)

    const currentState = await testHelper.blogsInDb()
    await api
      .delete(`/api/blogs/${testB.body.id}`)
      .expect(401)

    const finalState = await testHelper.blogsInDb()
    const blogTitles = finalState.map(b => b.title)
    expect(finalState).toHaveLength(currentState.length)
    expect(blogTitles).toContain(testB.body.title)
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
    const res = await api
      .put('/api/blogs/12432kdkd')
      .send(newLikes)
      .expect(400)

    const currentState = await testHelper.blogsInDb()
    expect(res.body.error).toContain('malformatted id')
    expect(currentState).toEqual(initialState)
  })
})
afterAll(() => mongoose.connection.close())