"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const {ensureCorrectUser, authenticateJWT} = require('../middleware/auth')

const ReferencePoint = require('../models/referencePoint')
const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const HeaderSituation = require('../models/headerSituation')
const HeaderSpecification = require('../models/headerSpecification')
const Tag = require('../models/tag')
const stepsAddSchema = require('../schemas/stepsAdd.json')
const User = require('../models/user')

router.post('/',  [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
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

router.patch('/:id',  [authenticateJWT, ensureCorrectUser], async function(req, res, next) {
    try {
        let formatedData = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === 'string') {
                switch (key) {
                    case 'header_situation_id':
                        const headerSituation = await HeaderSituation.create(value)
                        formatedData.header_situation_id = headerSituation.id
                        break;
                    case 'header_specification_id':
                        const headerSpecification = await HeaderSpecification.create(value)
                        formatedData.header_specification_id = headerSpecification.id

                        break;
                    case 'header_tag_id':
                        const tag = await Tag.create({tag: value})
                        formatedData.header_tag_id = tag.id

                        break;  
                    case 'category_id':
                        const category = await Category.create({category: value})
                        formatedData.category_id = category.id

                        break;  
                    case 'subcategory_id':
                        const subcategory = await Subcategory.create({subcategory: value})
                        formatedData.subcategory_id = subcategory.id

                        break;  
                }
            } else {
                formatedData[key] = value.id
            }
        }
        formatedData.id = req.params.id
        formatedData.indirectory = true


        const referencePointId = await ReferencePoint.update(formatedData)

        return res.json({referencePointId})
    } catch (err) {
        return next(err)
    }
})

router.get('/header/:username', async function(req, res, next) {
    try {
        const headerSituation = await HeaderSituation.getAll()
        const headerSpecification = await HeaderSpecification.getAll()
        const categories = await Category.getAll()
        const subcategories = await Subcategory.getAll()
        const userTags = await User.getUserTags(req.params.username)

        const headerValues = {
            headerSituation,
            headerSpecification,
            categories,
            subcategories,
            userTags
        }

        return res.json({headerValues})
    } catch (err) {
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

router.get('/categories/:id', async function(req, res, next) {
    try {
        const subcategories = await Subcategory.getAllByCategoryId(req.params.id)
        return res.json({subcategories})
    } catch (err) {
        return next(err)
    }
})

router.get('/categories/:categoryId/subcategories/:subcategoryId', async function(req, res, next) {
    try {
        const headers = await Subcategory.getHeadersBySubcategoryId(req.params.categoryId, req.params.subcategoryId)
        return res.json({headers})
    } catch (err) {
        return next(err)
    }
})

router.get('/tags', async function(req, res, next) {
    try {
        const tags = await Tag.getAll()
        return res.json({tags})
    } catch (err) {
        return next(err)
    }
})


router.get('/:id', async function(req, res, next) {
    try {
        const referencePoint = await ReferencePoint.getSpecificReferencePointInfoById(req.params.id)
        return res.json({referencePoint})
    } catch(err) {
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