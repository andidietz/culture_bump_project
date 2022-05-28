"use strict"

const jsonschema = require('jsonschema')
const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()

const ReferencePoint = require('../models/referencePoint')
const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const HeaderSituation = require('../models/headerSituation')
const HeaderSpecification = require('../models/headerSpecification')
const Tag = require('../models/tag')
const directoryAddSchema = require('../schemas/directoryAdd.json')
const stepsAddSchema = require('../schemas/stepsAdd.json')
const User = require('../models/user')

// The Culture Bump Directory consists of a form and catalogue:
//    Form: generate reference point's 'metadata' {such as category and title} 
//    Catalogue: list of all reference points added to the Directory

router.post('/',  async function(req, res, next) {
    try {
        // console.log('hitting directory POST !!', req.body)
        const validator = jsonschema.validate(req.body, stepsAddSchema)
        
        if (!validator.valid) {

            const errs = validator.errors.map(err => err.stack)

            throw new ExpressError(errs)
        }

        const referencePoint = await ReferencePoint.create(req.body)
        // console.log('router.post(/directory POST - referencePoint', referencePoint)

        return res.status(201).json({referencePoint})
    } catch (err) {
        // console.log('not working at all')
        return next(err)
    }
})

router.patch('/:id',  async function(req, res, next) {
    try {
        // console.log('hitting directory/:id POST !!', req.body)

        let formatedData = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === 'string') {
                switch (key) {
                    case 'header_situation_id':
                        const headerSituation = await HeaderSituation.create(value)
                        formatedData.header_situation_id = headerSituation.id
                        // console.log('Switch formatedData.header_situation_id', formatedData.header_situation_id)
                        break;
                    case 'header_specification_id':
                        const headerSpecification = await HeaderSpecification.create(value)
                        formatedData.header_specification_id = headerSpecification.id
                        // console.log('Switch formatedData.header_specification_id', formatedData.header_specification_id)

                        break;
                    case 'header_tag_id':
                        const tag = await Tag.create({tag: value})
                        formatedData.header_tag_id = tag.id
                        // console.log('Switch formatedData.header_tag_id', formatedData.header_tag_id)

                        break;  
                    case 'category_id':
                        const category = await Category.create({category: value})
                        formatedData.category_id = category.id
                        // console.log('Switch formatedData.category_id', formatedData.category_id)

                        break;  
                    case 'subcategory_id':
                        const subcategory = await Subcategory.create({subcategory: value})
                        formatedData.subcategory_id = subcategory.id
                        // console.log('Switch formatedData.subcategory', formatedData.subcategory_id)

                        break;  
                }
            } else {
                formatedData[key] = value.id
                // console.log("Switch  formatedData.key",  formatedData[key])
            }
        }
        formatedData.id = req.params.id
        formatedData.indirectory = true
        // console.log("Switch  formatedData",  formatedData)


        const referencePointId = await ReferencePoint.update(formatedData)
        // console.log('router. update refPoints', referencePointId)

        return res.json({referencePointId})
    } catch (err) {
        // console.log('not working at all')
        return next(err)
    }
})



router.get('/header/:username', async function(req, res, next) {
    // console.log('directory/header/:username', req.body)
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

        // console.log('directory routes - headerValues - headerValues', headerValues)
        return res.json({headerValues})
    } catch (err) {
        // console.log('route not working!')
        return next(err)
    }
})


router.get('/categories', async function(req, res, next) {
    try {
        const categories = await Category.getAll()
        // console.log('directory routes - categories - categories', categories)
        return res.json({categories})
    } catch (err) {
        // console.log('route not working')
        return next(err)
    }
})

router.get('/categories/:id', async function(req, res, next) {
    try {
        const subcategories = await Subcategory.getAllByCategoryId(req.params.id)
        // console.log('directory routes - categories - categories', subcategories)
        return res.json({subcategories})
    } catch (err) {
        // console.log('route not working')
        return next(err)
    }
})

router.get('/categories/:categoryId/subcategories/:subcategoryId', async function(req, res, next) {
    // console.log('directory routes - subcategories - hitting', res)

    try {
        const headers = await Subcategory.getHeadersBySubcategoryId(req.params.categoryId, req.params.subcategoryId)
        // console.log('directory routes - categories - categories', headers)
        return res.json({headers})
    } catch (err) {
        // console.log('route not working')
        return next(err)
    }
})

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

router.get('/tags', async function(req, res, next) {
    // console.log('hitting routes/user - getAlltags')
    try {
        // console.log('hitting routes/user - getAlltags')
        const tags = await Tag.getAll()
        // console.log('routes/user - Results - getAlltags', tags)
        return res.json({tags})
    } catch (err) {
        return next(err)
    }
})


router.get('/:id', async function(req, res, next) {
    try {
        const referencePoint = await ReferencePoint.getSpecificReferencePointInfoById(req.params.id)
        // console.log('directory - route /:id - res', referencePoint)

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