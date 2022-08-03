const _ = require('lodash')
const mongoose = require('mongoose')
const express = require('express')
const { Category, validateCategory } = require('../models/category')
const router = express.Router()

router.get('/', async (req, res) => {
    const category = await Category.find({parent: null})
    res.send(category)
})

router.post('/', async (req, res) => {
    const {error} = validateCategory(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const category = new Category({
        name: req.body.name,
        parent: req.body.parent 
    })
    await category.save()
    
    res.send(category)
})

router.put('/:id', async (req, res) => {
    const {error} = validateCategory(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // var updateDate = 
    // console.log(updateDate)
    
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        parent: req.body.parent,
        updateAt: new Date()
    }, {new: true})
   res.send(category)
})

router.get('/subcategory/:id', async (req, res) => {
    const subCategory = await Category.find({parent: req.params.id})
    res.send(subCategory)
})

router.get('/subcategory', async (req, res) => {
    const subCategory = await Category.find({parent: {$ne : null}})
    res.send(subCategory)
})

router.delete('/:id', async (req, res) =>{
    const category = await Category.findByIdAndRemove(req.params.id)
})

module.exports = router