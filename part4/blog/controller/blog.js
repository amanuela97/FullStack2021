const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (_, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    }).catch((error) => next(error))
})

module.exports = blogRouter