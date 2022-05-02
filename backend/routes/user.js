"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const User = require('../models/user')
const Bookmark = require('../models/bookmark')


const userRegisterSchema = require('../schemas/userRegister.json')

router.post('/', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }

        const user = await User.register(req.body)
        // TODO: CreateToken
        return res.status(201).json({user})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username', async function(req, res, next) {
    try {
        console.log(req.params.username)
        const user = await User.get(req.params.username)
        console.log(user)
        return res.json({user})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username/bookmarks', async function(req, res, next) {
    try {
        console.log('username', req.params.username)
        const bookmarks = await Bookmark.get(req.params.username)
        return res.json({bookmarks})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username/reference-points', async function(req, res, next) {
    try {
        const referencePoints = await User.getAllReferencePoints(req.params.username)
        return res.json({referencePoints})
    } catch (err) {
        return next(err)
    }
})

router.get('/:username/tags', async function(req, res, next) {
    try {
        const userTags = User.getUsersTags(req.params.username)
        return res.json({userTags})
    } catch (err) {
        return next(err)
    }
})

router.delete('/:username', async function(req, res, next) {
    try {
        await User.remove(req.params.username)
        return res.json({deleted: req.params.username})
    } catch (err) {
        return next(err)
    }
})

module.exports = router