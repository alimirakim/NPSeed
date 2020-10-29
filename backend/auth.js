const jwt = require('jsonwebtoken')
const bearerToken = require('express-bearer-token')
const { User } = require('./db/models')
const { jwtConfig: { secret, expiresIn } } = require('./config')


function makeToken(user) {
  const data = {
    id: user.id,
    username: user.username,
    email: user.email,
  }
  return jwt.sign({ data }, secret, { expiresIn })
}



async function getToken(req, res, next) {
  const { token } = req
  if (!token) return next({ status: 401, message: 'i need token :C ' })

  return jwt.verify(token, secret, null, async (err, payload) => {
    console.log("\n\npayload", payload)
    if (err) {
      // err.status = 401 // twitter clone
      err.status = 401
      err.title = "401 Bad Token"
      return next(err)
    }
    try {
      req.user = await User.findByPk(payload.data.id)
    } catch (err) {
      err.status = 401
      err.title = "401 User with token not found"
      return next(err)
    }

    if (!req.user) return res.set("WWW-Authenticate", "Bearer").status(401).end()
    else return next()
  })
}

const checkAuth = [bearerToken(), getToken]

module.exports = {
  makeToken,
  checkAuth
}