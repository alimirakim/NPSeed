const jwt = require('jsonwebtoken')
// const uuid = require('uuid').v4
const bearerToken = require('express-bearer-token')
const { User } = require('./db/models')
const { jwtConfig: { secret, expiresIn } } = require('./config')


function makeToken(user) {
  const data = {
    id: user.id,
    username: user.username,
    email: user.email,
  }
  // jwtId = uuid()
  // Make user's token
  return {
    jwtid,
    token: jwt.sign({ data }, secret, { expiresIn }, ) // jwtId)
  }
}


async function getToken(req, res, next) {
  const { token } = req
  // if (!token) return res.status(401).end() // twitter clone
  if (!token) return next({ status: 401, message: 'i need token :C '})

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      // err.status = 401 // twitter clone
      err.status = 403
      return next(err)
    }

    try {
      const { id } = payload.data
      req.user = await User.findByPk(id)
    } catch (err) {
      return next(err)
    }

    if (!req.user) {
      return res.status(401).end()
    }
    next()
  })
}

const checkAuth = [bearerToken(), getToken]

module.exports = {
  makeToken,
  checkAuth
}