const mongoose = require('mongoose')
const Joi = require('joi')

const Product = mongoose.model('Product', new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
    },
    subCategoryName:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: String,
        // required: true,
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateAt: {
        type: Date,
    }
}))

function validateProduct(product){
    const schema = Joi.object({
        categoryId: Joi.string(),
        subCategoryId: Joi.string(),
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(100).required(),
        price: Joi.number().required().max(100000),
        images: Joi.string(),
    })
    return schema.validate(product)
}

exports.Product = Product
exports.validateProduct = validateProduct
