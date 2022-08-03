const path = require('path')
// const ejs = require('')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const express = require("express");
const app = express()
const mongoose = require("mongoose");
const category = require('./routes/categories')
const product = require('./routes/products')
const img = require('./routes/imgs')

mongoose
  .connect("mongodb://localhost/shop-app")
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Something went wrong!", err));

  app.use(express.static('uploads'))

  app.use(express.json())
  // app.use(fileUpload())
  app.use(cors())
  app.use('/api/category', category)
  app.use('/api/product', product)
  app.use('/api/img',img)

app.listen(3001, () => console.log('listening on port 3001'))