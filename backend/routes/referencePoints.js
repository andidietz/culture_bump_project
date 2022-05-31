"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const Category = require('../models/category')
const ReferencePoint = require('../models/referencePoint')
const stepsAddSchema = require('../schemas/stepsAdd.json')
const {ensureCorrectUser, authenticateJWT, ensureLoggedIn} = require('../middleware/auth')

router.post('/', [authenticateJWT, ensureLoggedIn], async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, stepsAddSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }

        const referencePoint = await ReferencePoint.create(req.body)

        return res.status(201).json({referencePoint})
    } catch (err) {
        return next(err)
    }
})

router.get('/', async function(req, res, next) {
    try {
        const referencePoint = await ReferencePoint.getAll(req.query)
        return res.json({referencePoint})
    } catch(err) {
        return next(err)
    }
})

router.get('/:id', async function(req, res, next) {
    try {
        const referencePoint = await ReferencePoint.getBasicReferencePointInfoById(req.params.id)
        return res.json({referencePoint})
    } catch(err) {
        return next(err)
    }
})

router.get('/categories', async function(req, res, next) {
    try {
        const categories = await Category.getAll()
        return res.json({categories})
    } catch (err) {
        return next(err)
    }
})

router.delete('/:id', [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        await ReferencePoint.remove(req.params.id)
        return res.json({deleted: req.params.id})
    } catch (err) {
        return next(err)
    }
})

module.exports = router