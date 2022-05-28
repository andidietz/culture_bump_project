"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const Category = require('../models/category')
const ReferencePoint = require('../models/referencePoint')
const directoryAddSchema = require('../schemas/directoryAdd.json')
const stepsAddSchema = require('../schemas/stepsAdd.json')

router.post('/',  async function(req, res, next) {
    try {
        // console.log('hitting directory POST', req.body)
        const validator = jsonschema.validate(req.body, stepsAddSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(err => err.stack)
            throw new ExpressError(errs)
        }

        const referencePoint = await ReferencePoint.create(req.body)
        // console.log('router.post(/directory POST - referencePoint', referencePoint)

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
        // console.log('reference-point routes - /:id - req.params.id', req.params.id)
        const referencePoint = await ReferencePoint.getBasicReferencePointInfoById(req.params.id)
        return res.json({referencePoint})
    } catch(err) {
        return next(err)
    }
})

router.get('/categories', async function(req, res, next) {
    // console.log('directory routes - categories - hitting', res)

    try {
        const categories = await Category.getAll()
        // console.log('directory routes - categories - categories', categories)
        return res.json({categories})
    } catch (err) {
        return next(err)
    }
})

router.delete('/:id', async function(req, res, next) {
    try {
        await ReferencePoint.remove(req.params.id)
        return res.json({deleted: req.params.id})
    } catch (err) {
        return next(err)
    }
})

module.exports = router