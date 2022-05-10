"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const User = require('../models/user')
const Bookmark = require('../models/bookmark')

const {ensureCorrectUser} = require('../middleware/auth')
const userRegisterSchema = require('../schemas/userRegister.json')
const userLoginSchema = require('../schemas/userLogin.json')
const { createToken } = require('../helper/tokens')

router.post('/register', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema)
        // console.log('routes/users/register - validator', validator.valid)

        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }
        // console.log('routes/users/register - req.body', req.body)
        const user = await User.register(req.body)
        const token = createToken(user)
        return res.status(201).json({token})
    } catch (err) {
        return next(err)
    }
})

router.post('/token', async function(req, res, next) {
    try {
        // console.log('router.post(/login - req.body', req.body)
        const validator = jsonschema.validate(req.body, userLoginSchema)

        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }
        const {username, password} = req.body
        const user = await User.authenticate(username, password)
        // console.log('router.post(/login - user', user)

        const token = createToken(user)
        console.log('router.post(/login - token', token)

        return res.status(201).json({token})
    } catch (err) {
        return next(err)
    }
})


router.get('/:username', async function(req, res, next) {
    try {
        // console.log('req.params.username', req.params.username)
        const user = await User.get(req.params.username)
        console.log('User Routes - GET - /:username', user)
        return res.json({user})
    } catch (err) {
        return next(err)
    }
})

// router.get('/:username/bookmarks', ensureCorrectUser, async function(req, res, next) {
//     try {
//         console.log('username', req.params.username)
//         const bookmarks = await Bookmark.get(req.params.username)
//         return res.json({bookmarks})
//     } catch (err) {
//         return next(err)
//     }
// })

router.get('/:username/reference-points', async function(req, res, next) {
    try {
        // console.log('hitting routes/user - referencePoints', referencePoints)
        const referencePoints = await User.getAllReferencePoints(req.params.username)
        // console.log('routes/user - Results - referencePoints', referencePoints)
        return res.json({referencePoints})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username/tags', ensureCorrectUser, async function(req, res, next) {
    try {
        const userTags = User.getUsersTags(req.params.username)
        return res.json({userTags})
    } catch (err) {
        return next(err)
    }
})

router.delete('/:username', ensureCorrectUser, async function(req, res, next) {
    try {
        await User.remove(req.params.username)
        return res.json({deleted: req.params.username})
    } catch (err) {
        return next(err)
    }
})

module.exports = router