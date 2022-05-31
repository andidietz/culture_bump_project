"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const User = require('../models/user')
const Tag = require('../models/tag')

const {ensureCorrectUser, authenticateJWT, ensureLoggedIn} = require('../middleware/auth')
const userRegisterSchema = require('../schemas/userRegister.json')
const userLoginSchema = require('../schemas/userLogin.json')
const { createToken } = require('../helper/tokens')

router.post('/register', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema)

        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }

        const user = await User.register(req.body)
        const token = createToken(user)
        
        return res.status(201).json({token})
    } catch (err) {
        return next(err)
    }
})

router.post('/token', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userLoginSchema)

        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }
        const {username, password} = req.body
        const user = await User.authenticate(username, password)

        const token = createToken(user)

        return res.status(201).json({token})
    } catch (err) {
        return next(err)
    }
})

router.get('/tags', ensureLoggedIn, async function(req, res, next) {
    try {
        const tags = await Tag.getAll()
        return res.json({tags})
    } catch (err) {
        return next(err)
    }
})


router.patch('/:username', [authenticateJWT, ensureCorrectUser], async function (req, res, next) {
    try {
        const user = await User.update(req.params.username, req.body)
        return res.json({user})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        const user = await User.get(req.params.username)
        return res.json({user})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username/referencePoints', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        const referencePoints = await User.getUserReferencePoints(req.params.username)
        return res.json({referencePoints})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username/tags', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        const tags = await User.getUserTags(req.params.username)

        return res.json({tags})
    } catch (err) {
        return next(err)
    }
})

router.post('/:username/tags', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        let tagId;
        if (typeof req.body.tag === 'string') {
            const tag = await Tag.create(req.body)
            tagId = tag.id
        } else {
            tagId = req.body.tag.id   
        }

        const tagInfo ={
            username: req.params.username,
            tagId: tagId
        }
        
        const tag = await User.addUserTag(tagInfo)
        return res.status(201).json({tag})
    } catch (err) {
        return next(err)
    }
})

router.delete('/:username', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        await User.remove(req.params.username)
        return res.json({deleted: req.params.username})
    } catch (err) {
        return next(err)
    }
})

module.exports = router