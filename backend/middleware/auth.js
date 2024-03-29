const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')
const ExpressError = require('../expressError')

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim()
      res.locals.user = jwt.verify(token, SECRET_KEY)
    }
    return next()
  } catch (err) {
    return next()
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new ExpressError()
    return next()
  } catch (error) {
    return next(error)
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user
    if (!(user && (user.username === req.params.username))) {
      throw new ExpressError()
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser
}