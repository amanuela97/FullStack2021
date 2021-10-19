const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const decodeToken = req => jwt.verify(req.token, process.env.SECRET)
const tokenError = res => res.status(401).json({ error: 'token missing or invalid' })

blogRouter.get('/', async (_, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  return res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = decodeToken(req)
  if (!decodedToken.id || !req.token) tokenError()
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const blogWithUserInfo = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  res.status(201).json(blogWithUserInfo.toJSON())
})

blogRouter.put('/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body,{ new: true }).populate('user', { username: 1, name: 1 })
  res.json(updated.toJSON())
})

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = decodeToken(req)
  const blog = await Blog.findById(req.params.id)

  if (!decodedToken.id || !req.token) tokenError()
  if (blog.user.toString() !== decodedToken.id.toString()){
    return res
      .status(401)
      .json({ error: 'deletion is only authorized to the author!' })
  }
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.post('/:id/comments', async (req,res) => {
  const blog = await (await Blog.findById(req.params.id)).populate('user', { username: 1, name: 1 })
  blog.comments = blog.comments.concat(req.body)
  blog.save()
  res.status(201).json(blog)
})

module.exports = blogRouter