const _ = require("lodash");
const multer = require("multer");
// const upload = multer({dest: '../uploads'})
const express = require("express");
const { Product, validateProduct } = require("../models/product");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = await Product.find();
  res.send(category);
});


//=========Storage===========================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage })

//=========Storage===========================================


router.post('/',upload.single('image'),async (req, res) => {

  // const { error } = validateProduct(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // console.log(req.file)
  // console.log(req.body.name)

  // const {
  //     body: {name, description, price, category, subCategory}
  //   } = req

  const product = new Product({
    categoryName: req.body.category,
    subCategoryName: req.body.subCategory,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    images: req.file.filename
  });
const result =  await product.save();
if(!result) res.status(400).send('dgasgerahtr')
  res.send(product);  
});

router.put('/:id',upload.single('image'),async (req, res) => {

  // const {error} = validateCategory(req.body)
  // if(error) return res.status(400).send(error.details[0].message)

  const product = await Product.findByIdAndUpdate(req.params.id,{
    categoryName: req.body.category,
    subCategoryName: req.body.subCategory,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    images: req.file.filename,
    updateAt: new Date()
  },{new: true})

  res.send(product);  
})

router.delete('/:id', async (req, res) =>{
  const product = await Product.findByIdAndRemove(req.params.id)
})


router.put

module.exports = router;
