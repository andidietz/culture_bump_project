"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const ReferencePoint = require('../models/referencePoint')
const directoryAddSchema = require('../schemas/directoryAdd.json')

// The Culture Bump Directory consists of a form and catalogue:
//    Form: generate reference point's 'metadata' {such as category and title} 
//    Catalogue: list of all reference points added to the Directory

router.post('/', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, directoryAddSchema)
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
        console.log(req.params.id)
        const referencePoint = await ReferencePoint.get(req.params.id)
        return res.json({referencePoint})

    } catch(err) {
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