const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const product = require('../models/productschema')

//create product
router.post('/createproduct', [
  body('name', 'name should of at least 5 characters').isLength({ min: 5 }),
  body('description', 'Description should of at least 5 characters').isLength({ min: 5 }),
  body('price', 'price is in numbers').isNumeric(),
  // body('mainimg' , 'given link should be a valid URL').isURL(),
  body('color', 'Color should be in string of minimum character 3').isString().isLength({min:3}),
  body('category', 'category should be in string of minimum character 3').isString().isLength({min:3})
] , async (req, res) => {
  try {
    const {name , mainimg , images , price , color , description , category , size , originalprice , discount , rating , instock}=req.body
    const result = validationResult(req);
    if (result.isEmpty()) {
      const newproduct = new product({name:name , mainimg:mainimg , images:images , price:price , color:color , description:description , category:category , instock:instock, size:size , rating:rating, originalprice:originalprice, discount:discount, productid: Math.floor(Math.random() * 1000000 + 657)})
      const saveproduct = await newproduct.save()
      if(saveproduct){
        return res.json({message:'Product Created'})
      }
    }

    return res.json({ errors: result.array() });
  } catch (error) {
    console.log(error);
  }
})
//tshirt
router.get('/getproduct/:category' , async(req,res)=>{
  try {
    const getproduct = await product.find({category:req.params.category}).limit(8)
    return res.json(getproduct)
  } catch (error) {
     console.log(error);
  }
})
//get 8 products
router.post('/getitem' , async(req,res)=>{
  try {
    const{category, colorcode , min , max , sizevalue,sort}=req.body
    // console.log(category, colorcode , min , max , sizevalue,sort);
    const obj={}
    const sortobj={}
    if(category){
      obj.category=category
    }
    if(colorcode){
      obj.color=colorcode
    }
    if(min || max){
        obj.$and=[{'price':{$gte:min}} , {'price':{$lte:max}}]
    }
    if(sizevalue){
      obj.size={$elemMatch:{'size':sizevalue}}
    }
    if(sort===3){
       sortobj.rating=1
    }
    else if(sort===4){
      sortobj.rating=-1
    }
    else if(sort===2){
      sortobj.price=-1
    }
    else if(sort===1){
      sortobj.price=1
    }
    // console.log(obj);
    const getproduct = await product.find(obj).sort(sortobj)
    // console.log(getproduct);
    return res.json(getproduct)
  } catch (error) {
     console.log(error);
  }
})

//getitembyproductid
router.post('/getitembyproductid' , async(req,res)=>{
  try {
     const getproduct = await product.findOne({productid:req.body.productid})
     return res.json(getproduct)
  } catch (error) {
     console.log(error);
  }
})

router.post('/getsearch' , async(req,res)=>{
  try {

    const getdata = await product.find({name:{$regex:String(req.body.search) , $options:'i'}})
    if(getdata){
      return res.json(getdata)
    }
  } catch (error) {
    console.log(error);
  }
})
module.exports = router