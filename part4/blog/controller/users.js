const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const body = req.body
  if (!(body.password && body.password.length >= 3)) {
    return res.status(400).send({ error: 'invalid password, password length must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser.toJSON())
})

usersRouter.get('/', async (_, res) => {
  const users = await User
    .find({})
    .populate('blogs')
  res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter