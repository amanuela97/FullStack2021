const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
]

const testBlog = {
  title: 'saving blogs to database',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 0,
}

const blogToBeDeleted = {
  title: 'random blog title',
  author: 'John Doe',
  url: 'https://medium.com/swlh/stop-using-if-else-statements-f4d2323e6e4',
  likes: 22
}
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'for deletion test',
    author: 'mike miller',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 5
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  testBlog,
  blogToBeDeleted
}
