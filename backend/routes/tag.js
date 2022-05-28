"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const User = require('../models/user')
const Tag = require('../models/tag')
const Bookmark = require('../models/bookmark')

const {ensureCorrectUser} = require('../middleware/auth')
const userRegisterSchema = require('../schemas/userRegister.json')
const userLoginSchema = require('../schemas/userLogin.json')
const { createToken } = require('../helper/tokens')


router.get('/:username', async function(req, res, next) {
  try {
      // console.log('req.params.username', req.params.username)
      const user = await User.get(req.params.username)
      // console.log('User Routes - GET - /:username', user)
      return res.json({user})
  } catch (err) {
      return next(err)
  }
})