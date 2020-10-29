const bcrypt = require('bcryptjs')
const usersRouter = require('express-promise-router')()
const { User } = require('../db/models')
const { userValidators, emailValidator } = require('./validators')
const { makeToken, checkAuth } = require("../auth")

// Get user by id
usersRouter.get("/:id",
  checkAuth,
  async (req, res) => {
    // TODO Do I need to parseInt(req.params.id, 10) like Twitter clone?
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "email"]
    })
    if (user) res.json({ user })
  })

// Make user authentication token
usersRouter.post("/token",
  userValidators,
  async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username", "email"]
    })
    // Reject request if user doesn't exist or password is invalid
    if (!user || user.validatePassword(password)) {
      const err = Error("Login big fail")
      err.status = 401
      err.title = "401 Login Fail"
      err.errors = ["The provided credentials are invalid."]
      return next(err)
    }
    const token = makeToken(user)
    res.json({ token, user })
  })

// Make new user and token
usersRouter.post("/users",
  userValidators,
  emailValidator,
  async (req, res) => {
    const { username, email, password } = req.body
    const hashword = bcrypt.hashSync(password, 10)
    const user = await User.create({ username, email, hashword })
    const token = makeToken(user)
    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    })
  }
)

// Update user data
usersRouter.patch("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    const { username, email, password } = req.body
    // TODO Can I do (user.username || username) ?
    user.username = username
    user.email = email
    user.password = bcrypt.hashSync(password)
  }
})



module.exports = usersRouter