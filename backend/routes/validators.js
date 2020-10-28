const { check, validationResult } = require('express-validator')

function validationErrorsHandler(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMsgs = validationErrors.array().map((err => err.msg))
    
    const err = Error("400 That request is bad to the bone.")
    err.status = 400
    err.title = "400 Bad Request"
    err.errors = errorMsgs
    return next(err)
  }
  next()
}

const usernameValidator = check('username')
    // TODO Check if isUnique is a thing. I'm guessin'.
    // .isUnique()
    // .withMessage("That one's taken already~")
    .isLength({ min: 1, max: 40 })
    .withMessage("Gotta' be between 1-40 letters long.")

const emailValidator = check('email')
    .isEmail()
    .withMessage("I need a valid email!")
    .isLength({ min: 3, max: 255 })
    .withMessage("Too long (or short).")
    // .isUnique()
    // .withMessage("That one's taken already~")
const passwordValidator = [
  check('password')
    .isLength({ min: 8, max: 60 })
    .withMessage("Passwords gotta' be between 8-60 letters long."),
  check('confirmPassword')
    .exists({ checkFalsy: true })
  // TODO custom to check if exact match
]

const userValidators = [
  usernameValidator,
  passwordValidator,
  validationErrorsHandler,
]

const genValidators = []

const charValidators = []


module.exports = {
  validationErrorsHandler,
  userValidators,
  emailValidator,
  genValidators,
  charValidators,
}