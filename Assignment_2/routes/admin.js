const express = require("express")
const router = express.Router()
const path = require('path')
const rootDir = require('../util/path')

const products = [] 

router.get('/add-product', (req,res)=>{

   res.sendFile(path.join(rootDir,  'views','add-product.html'))
     
})
 
router.post('/add-product', (req,res)=>{

    products.push({title: req.body.title})

    console.log(products)
    
    res.sendFile(path.join(rootDir,'views','add-product.html'))

    res.redirect('/')


})

exports.routes = router
exports.products = products

