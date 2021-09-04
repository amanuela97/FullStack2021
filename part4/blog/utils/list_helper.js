const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return {}
  const likes = blogs.map((blog) => blog.likes)
  const mostLiked = Math.max(...likes)
  const favorite = blogs.find((blog) => blog.likes === mostLiked)
  delete favorite._id
  delete favorite.__v
  delete favorite.url
  return favorite
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const mostBlogs = _
    .chain( blogs)
    .countBy('author')
    .toPairs()
    .maxBy(_.last)
    .value()
  return { 'author': mostBlogs[0], 'blogs': mostBlogs[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  let obj = blogs.reduce((bl, { author, likes }) => {
    bl[author] = bl[author] || 0
    bl[author] += likes
    return bl
  },{})
  const author = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
  return { 'author': author, 'likes': obj[author] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}