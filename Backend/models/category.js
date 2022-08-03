const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    parent: {
        type: String,
        default: null
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateAt: {
        type: Date,
    }
})

const Category = mongoose.model('Category', categorySchema) 

function validateCategory(category){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        parent: Joi.string()
    })
    return schema.validate(category)
}

exports.Category = Category
exports.validateCategory = validateCategory
