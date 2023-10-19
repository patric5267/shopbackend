const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
// const dotenv = require('dotenv')
const crypto = require('crypto')
// dotenv.config({path:'./config.env'})
const orderss = require('../models/orderschema')

const instance = new Razorpay({
    key_id: 'rzp_test_hdW55ilitM7doG',
    key_secret: 'mdVnsIdNyPefj0L4C0MK0kfv',
  });

router.get('/price/:price' , async(req,res)=>{
    try {
    //    console.log(req.params.price);
        var options = {
            amount: req.params.price*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };

        const orders = await instance.orders.create(options)
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
    }
})

router.post('/payment' , async(req,res)=>{
  const{payment,order,sign}=req.body
  // console.log(payment,order,sign);
  const body = order + "|" + payment
  const signature = crypto.createHmac('sha256' ,  'mdVnsIdNyPefj0L4C0MK0kfv').update(body.toString()).digest('hex')

  if(signature===sign){
    return res.json({message:'payment successful' , paymentid:payment})
    // console.log('payment successful');
  }
})

router.get('/key' , async(req,res)=>{
  return res.json({key:'rzp_test_hdW55ilitM7doG'})
})


router.post('/order' , async(req,res)=>{
  try {
   const {cartitem} = req.body
   const d= new Date()
   const date = d.getDate()
   const month = d.getMonth() +1
   const year = d.getFullYear()
   if(cartitem.length!==0){
    // console.log(cartitem);
    for(i=0;i<cartitem.length;i++){
     const makeorders = new orderss({email:cartitem[i].email , name:cartitem[i].name , img:cartitem[i].image , size:cartitem[i].size , date:date , month:month , year:year})
      await makeorders.save()
    }
   }
   
  } catch (error) {
     console.log(error);
  }
})
router.get('/getorder/:email' , async(req,res)=>{
  try {
    const getorder = await orderss.find({email:req.params.email})
    if(getorder){
      return res.json(getorder)
    }
  } catch (error) {
    console.log(error);
  }
})
module.exports=router  