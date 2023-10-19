const express = require('express')
const router = express.Router()
const cart = require('../models/CartSchema')
const wish = require('../models/wishschema')

//add item in cart
router.post('/additem', async (req, res) => {
    try {
        const { email, pname, size, pid, price, img, oldp, original, discount, quan } = req.body
        const finditem = await cart.findOne({ $and: [{ email: email }, { productid: pid }] })
        if (finditem) {
            return res.json({ message: 'Item already added to Cart' })
        }
        else {
            const newitem = new cart({ email: email, name: pname, size: size, productid: pid, price: price, originalprice: original, discount: discount, quantity: quan, image: img,oldp:oldp })
            const saveitem = await newitem.save()
            if (saveitem) {
                return res.json({ message: 'Item added to Cart' })
            }
        }

    } catch (error) {
        console.log(error);
    }
})
//cartitems
router.get('/getcartitem/:email' , async(req,res)=>{
    try {
        // console.log(req.params.email);
        const getitem = await cart.find({email:req.params.email})
        return res.json(getitem)
    } catch (error) {
        console.log(error);
    }
})
router.get('/removecartitem/:id' , async(req,res)=>{
    try {
        const cartitem = await cart.deleteOne({_id:req.params.id})
        if(cartitem){
            return res.json({message:'item deleted'})
        }
    } catch (error) {
         console.log(error);
    }
})


router.post('/indec' , async(req,res)=>{
    try {
        // console.log(req.body);
        await cart.updateOne({_id:req.body.id} , {$set:{quantity:req.body.quant}})
        const updateitem = await cart.updateOne({_id:req.body.id} , {$set:{price:req.body.mprice}})
        if(updateitem){
            return res.json({message:'updated'})
        }
    } catch (error) {
         console.log(error);
    }
})

router.post('/wish' , async(req,res)=>{
    try {
        const {pname , pid  , discount , original , price, img ,email}=req.body
        const findwish = await wish.findOne({email:email , productid:pid})
        if(findwish){
            return res.json({message:'Product already added to wishlist'})
        }
        else{
            const newwish = new wish({name:pname , originalprice:original , price:price , img:img , discount:discount , productid:pid , email:email})
            const savewish = newwish.save()
            if(savewish){
                return res.json({message:'Product added to wishlist'})
            }
        }
       
    } catch (error) {
        console.log(error);
    }
})

router.get('/getwish/:email'  , async(req,res)=>{
    try {
        // console.log(req.params.email);
        const getwish = await wish.find({email:req.params.email})
        if(getwish){
            return res.json(getwish)
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/getwishcount/:email' ,async(req,res)=>{
    try {
        const getwishcount = await wish.find({email:req.params.email}).count()
        if(getwishcount){
            return res.json(getwishcount)
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/removewish/:id' , async(req,res)=>{
    try {
        const deletewish = await wish.deleteOne({_id:req.params.id})
        if(deletewish){
            return res.json({message:'deleted'})
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router