const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')

function createToken({username}) {
  let payload = {
    username: username
  }

  return jwt.sign(payload, SECRET_KEY)
}

module.exports = {createToken}