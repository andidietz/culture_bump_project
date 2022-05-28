"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const Category = require('../models/category')
const stepsToolAddSchema = require('../schemas/stepsToolAdd.json')

router.post('/', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(re.body, stepsToolAddSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }

        const eightSteps = await ReferencePoints.create(req.body)
        return res.status(201).json({eightSteps})
    } catch (err) {
        return next(err)
    }
})

// TODO: Add auth to route
router.delete('/:id', async function(req, res, next) {
    try {
        await ReferencePoints.remove(req.params.id)
        return res.json({deleted: req.params.id})
    } catch (err) {
        return next(err)
    }
})

module.exports = router