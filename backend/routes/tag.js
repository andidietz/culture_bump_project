"use strict"

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {ensureCorrectUser, authenticateJWT} = require('../middleware/auth')

router.get('/:username', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
  try {
    const user = await User.get(req.params.username)
    return res.json({user})
  } catch (err) {
    return next(err)
  }
})